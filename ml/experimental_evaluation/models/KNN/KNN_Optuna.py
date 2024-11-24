from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import optuna
import pypickle
import os

# KNN models do not have loss calculation
# Using Optuna as the hyperparameter optimizer to obtain the best possible model

class KNN:
    
    def __init__(self, X, Y, n_neighbors, force_model_creation):
        self.X = X
        self.Y = Y
        self.n_neighbors = n_neighbors
        self.force_model_creation = force_model_creation

    def split(self):
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(self.X)
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X_scaled, self.Y, test_size=0.2, random_state=42)


    def objective(self, trial):
        p = trial.suggest_categorical('p', [1, 2])

        model = KNeighborsClassifier(n_neighbors=self.n_neighbors, p=p)
        model.fit(self.X_train, self.y_train)

        preds = model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, preds)

        return accuracy
    
    def create_and_train_model(self):
        study = optuna.create_study(direction='maximize')
        study.optimize(self.objective, n_trials=20)
        best_params = study.best_trial.params
        self.model = KNeighborsClassifier(n_neighbors=self.n_neighbors, **best_params)
        self.model.fit(self.X_train, self.y_train)


    def train_and_evaluate(self):
        self.split()
        history = None
        # If there's a saved module, we load and therefore skip the optmiization
        # because we have an optimal model
        if not self.force_model_creation:
            if os.path.isfile('./models/KNN/model/KNN_model.pkl'):
                print("Force model creation is set to false. Loading latest saved model.")
                self.model = pypickle.load('./models/KNN/model/KNN_model.pkl')
            else:
                print("Force model creation is set to false. However, no model was found. Creating new model.")    
                history = self.create_and_train_model()
        else:
            print("Force model creation is set to True. Creating new model.")
            history = self.create_and_train_model()
            
        predictions = self.model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, predictions)
        cr = classification_report(self.y_test, predictions, output_dict=True)
        cm = confusion_matrix(self.y_test, predictions)

        return history, accuracy, cm, cr
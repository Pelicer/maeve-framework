from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.naive_bayes import GaussianNB
import optuna
import pypickle
import os

# Gaussian models do not have loss calculation
# Using Optuna as the hyperparameter optimizer to obtain the best possible model

class GNB:
    
    def __init__(self, X, Y, force_model_creation):
        self.X = X
        self.Y = Y
        self.force_model_creation = force_model_creation

    def split(self):
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(self.X)
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X_scaled, self.Y, test_size=0.2, random_state=42)

    def objective(self, trial):
        var_smoothing = trial.suggest_float('var_smoothing', 1e-10, 1e-2, log=True)

        model = GaussianNB(var_smoothing=var_smoothing)
        model.fit(self.X_train, self.y_train)

        preds = model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, preds)

        return accuracy
    
    def create_and_train_model(self):
        study = optuna.create_study(direction='maximize')
        study.optimize(self.objective, n_trials=50)
        best_params = study.best_trial.params
        self.model = GaussianNB(**best_params)
        return self.model.fit(self.X_train, self.y_train)

    
    def train_and_evaluate(self):
        self.split()
        history = None
        # If there's a saved module, we load and therefore skip the optmiization
        # because we have an optimal model
        if not self.force_model_creation:
            if os.path.isfile('./models/GNB/model/GNB_model.pkl'):
                print("Force model creation is set to false. Loading latest saved model.")
                self.model = pypickle.load('./models/GNB/model/GNB_model.pkl')
            else:
                print("Force model creation is set to false. However, no model was found. Creating new model.")    
                self.create_and_train_model()
        else:
            print("Force model creation is set to True. Creating new model.")
            self.create_and_train_model()
            

        predictions = self.model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, predictions)
        cr = classification_report(self.y_test, predictions, output_dict=True)
        cm = confusion_matrix(self.y_test, predictions)
        return history, accuracy, cm, cr
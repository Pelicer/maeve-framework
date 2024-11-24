from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, log_loss
import optuna
from sklearn.svm import SVC
import pypickle
import os
from history import History

# @TODO: Merge with RBF and have parameters?
# Using Optuna as the hyperparameter optimizer to obtain the best possible model

class SVC_Linear:
    
    def __init__(self, X, Y, force_model_creation):
        self.X = X
        self.Y = Y
        self.force_model_creation = force_model_creation

    def split(self):
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(self.X)
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X_scaled, self.Y, test_size=0.2, random_state=42)

    def objective(self, trial):
        C = trial.suggest_float('C', 0.01, 10.0, log=True)
        tol = trial.suggest_float('tol', 1e-5, 1e-1, log=True)

        model = SVC(kernel='linear', C=C, tol=tol)
        model.fit(self.X_train, self.y_train)

        preds = model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, preds)

        return accuracy

    def create_and_train_model(self):
        study = optuna.create_study(direction='maximize')
        study.optimize(self.objective, n_trials=50)  # Adjust n_trials as necessary

        best_params = study.best_trial.params

        # Retrain model with best parameters to get full metrics
        self.model = SVC(kernel='linear', probability=True, **best_params)
        self.model.fit(self.X_train, self.y_train)
        
    def train_and_evaluate(self):
        self.split()
        history = None
        # If there's a saved module, we load and therefore skip the optmiization
        # because we have an optimal model
        if not self.force_model_creation:
            if os.path.isfile('./models/SVC_Linear/model/SVC_Linear_model.pkl'):
                print("Force model creation is set to false. Loading latest saved model.")
                self.model = pypickle.load('./models/SVC_Linear/model/SVC_Linear_model.pkl')
            else:
                print("Force model creation is set to false. However, no model was found. Creating new model.")    
                history = self.create_and_train_model()
        else:
            print("Force model creation is set to True. Creating new model.")
            history = self.create_and_train_model()
                
        predictions = self.model.predict(self.X_test)
        
        # Calcular as probabilidades preditas para calcular a perda (log_loss)
        y_train_proba = self.model.predict_proba(self.X_train)
        y_val_proba = self.model.predict_proba(self.X_test)
        
        # Calcular perdas de treinamento e validação
        train_loss = log_loss(self.y_train, y_train_proba)
        val_loss = log_loss(self.y_test, y_val_proba)

        # Calcular a acurácia de treinamento e validação
        train_accuracy = accuracy_score(self.y_train, self.model.predict(self.X_train))
        test_accuracy = accuracy_score(self.y_test, predictions)        
        
        accuracy = accuracy_score(self.y_test, predictions)
        cr = classification_report(self.y_test, predictions, output_dict=True)
        cm = confusion_matrix(self.y_test, predictions)

        history = History()
        history.add_epoch(train_loss, val_loss, train_accuracy, test_accuracy)

        return history, accuracy, cm, cr
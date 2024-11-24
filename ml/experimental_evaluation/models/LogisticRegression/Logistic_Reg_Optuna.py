from sklearn.model_selection import train_test_split
from sklearn.preprocessing import  StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, log_loss
import optuna
import pypickle
import os
from history import History

# Using Optuna as the hyperparameter optimizer to obtain the best possible model

class LogisticRegressionModel:
    
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
        penalty = trial.suggest_categorical('penalty', ['l1', 'l2', 'elasticnet'])
        solver = 'lbfgs'  # default solver
        if penalty == 'l1':
            solver = 'liblinear'
        elif penalty == 'l2':
            solver = trial.suggest_categorical('solver_l2', ['newton-cg', 'lbfgs', 'sag', 'saga'])
        elif penalty == 'elasticnet':
            solver = 'saga'
        l1_ratio = None
        if penalty == 'elasticnet':
            l1_ratio = trial.suggest_float('l1_ratio', 0, 1)

        model = LogisticRegression(C=C, penalty=penalty, solver=solver, l1_ratio=l1_ratio, max_iter=10000)
        model.fit(self.X_train, self.y_train)
        preds = model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, preds)
        return accuracy

    def create_and_train_model(self):
        study = optuna.create_study(direction='maximize')
        study.optimize(self.objective, n_trials=50)

        best_params = study.best_trial.params

        # Retrieve the best penalty and adjust the solver accordingly
        best_penalty = best_params['penalty']
        if best_penalty == 'l1':
            best_solver = 'liblinear'
        elif best_penalty == 'l2':
            best_solver = best_params.get('solver_l2', 'lbfgs')
        elif best_penalty == 'elasticnet':
            best_solver = 'saga'
        best_l1_ratio = best_params.get('l1_ratio', None)

        # Retrain the model with the optimized parameters
        self.model = LogisticRegression(C=best_params['C'], penalty=best_penalty,
                                        solver=best_solver, l1_ratio=best_l1_ratio, max_iter=10000)
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
                    self.create_and_train_model()
            else:
                print("Force model creation is set to True. Creating new model.")
                self.create_and_train_model()
                
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

            cr = classification_report(self.y_test, predictions, output_dict=True)
            cm = confusion_matrix(self.y_test, predictions)

            history = History()
            history.add_epoch(train_loss, val_loss, train_accuracy, test_accuracy)
            return history, test_accuracy, cm, cr
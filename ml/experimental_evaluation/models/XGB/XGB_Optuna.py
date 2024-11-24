from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import optuna
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, log_loss
import pypickle
import os
from history import History

# Using Optuna as the hyperparameter optimizer to obtain the best possible model

class XGB:
    
    def __init__(self, X, Y, force_model_creation):
        self.X = X
        self.Y = Y
        self.force_model_creation = force_model_creation

    def split(self):
        self.X_train, self.X_temp, self.y_train, self.y_temp = train_test_split(self.X, self.Y, test_size=0.3, random_state=42)
        self.X_val, self.X_test, self.y_val, self.y_test = train_test_split(self.X_temp, self.y_temp, test_size=0.4, random_state=42)

        scaler = StandardScaler()
        self.X_train = scaler.fit_transform(self.X_train)
        self.X_val = scaler.transform(self.X_val)
        self.X_test = scaler.transform(self.X_test)

    def objective(self, trial):
        param = {
            'verbosity': 0,
            'objective': 'binary:logistic',
            'early_stopping_rounds': 10,
            'booster': trial.suggest_categorical('booster', ['gbtree', 'dart']),
            'lambda': trial.suggest_float('lambda', 1e-8, 1.0, log=True),
            'alpha': trial.suggest_float('alpha', 1e-8, 1.0, log=True)
        }

        if param['booster'] == 'gbtree' or param['booster'] == 'dart':
            param['max_depth'] = trial.suggest_int('max_depth', 1, 9)
            param['eta'] = trial.suggest_float('eta', 1e-8, 1.0, log=True)
            param['gamma'] = trial.suggest_float('gamma', 1e-8, 1.0, log=True)
            param['grow_policy'] = trial.suggest_categorical('grow_policy', ['depthwise', 'lossguide'])

        if param['booster'] == 'dart':
            param['sample_type'] = trial.suggest_categorical('sample_type', ['uniform', 'weighted'])
            param['normalize_type'] = trial.suggest_categorical('normalize_type', ['tree', 'forest'])
            param['rate_drop'] = trial.suggest_float('rate_drop', 1e-8, 1.0, log=True)
            param['skip_drop'] = trial.suggest_float('skip_drop', 1e-8, 1.0, log=True)

        model = XGBClassifier(**param)
        model.fit(self.X_train, self.y_train, eval_set=[(self.X_val, self.y_val)], verbose=False)
        preds = model.predict(self.X_val)
        accuracy = accuracy_score(self.y_val, preds)
        return accuracy

    def create_and_train_model(self):
        study = optuna.create_study(direction='maximize')
        study.optimize(self.objective, n_trials=10)

        # Retrieve the best hyperparameters
        best_params = study.best_trial.params
        print('Best trial:', study.best_trial.params)

        # Train the best model
        self.model = XGBClassifier(**best_params)
        self.model.fit(self.X_train, self.y_train)

    def train_and_evaluate(self):
        self.split()
        history = None
        # If there's a saved module, we load and therefore skip the optmiization
        # because we have an optimal model
        if not self.force_model_creation:
            if os.path.isfile('./models/XGBoost/model/XGBoost_model.pkl'):
                print("Force model creation is set to false. Loading latest saved model.")
                self.model = pypickle.load('./models/XGBoost/model/XGBoost_model.pkl')
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
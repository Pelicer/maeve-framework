import tensorflow as tf
import os

from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.callbacks import EarlyStopping

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score

# The DeepLearning model does not use Optuna, as we reached the optimal state by trial and error

class DeepLearning():
    
    def __init__(self, X, Y, force_model_creation):
        self.X = X
        self.Y = Y
        self.force_model_creation = force_model_creation
        
    def split(self):
        self.X_train, self.X_test, self.Y_train, self.Y_test = train_test_split(self.X, self.Y, test_size=0.2, random_state=42)
        
        scaler = StandardScaler()
        self.X_train = scaler.fit_transform(self.X_train)
        self.X_test = scaler.transform(self.X_test)
        
    def create_model(self):          
        model = Sequential()
        model.add(Dense(32, input_dim=self.X_train.shape[1], activation='relu'))  # Adjust the input_dim as per your features
        model.add(Dense(16, activation='relu'))
        model.add(Dense(8, activation='relu'))
        model.add(Dense(4, activation='relu'))
        model.add(Dense(1, activation='sigmoid'))  # Output layer for binary classification
        return model

    def create_and_train_model(self):
        self.model = self.create_model()
        self.model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
        early_stopping = EarlyStopping(patience=7, monitor='val_loss')
        return self.model.fit(self.X_train, self.Y_train, epochs=50, batch_size=512, validation_split=0.25, callbacks=[early_stopping])
    
    def train_and_evaluate(self):
        with tf.device('/cpu:0'):
            self.split()
            history = None
            
            # If there's a saved module, we load and therefore skip the optmiization
            # because we have an optimal model
            if not self.force_model_creation:
                if os.path.isfile('./models/DeepLearning/model/DeepLearning_model.h5'):
                    print("Force model creation is set to false. Loading latest saved model.")
                    self.model = load_model('./models/DeepLearning/model/DeepLearning_model.h5')
                else:
                    print("Force model creation is set to false. However, no model was found. Creating new model.")    
                    history = self.create_and_train_model()
            else:
                print("Force model creation is set to True. Creating new model.")
                history = self.create_and_train_model()


            y_pred_proba = self.model.predict(self.X_test).flatten()
            y_pred_classes = (y_pred_proba > 0.5).astype(int)

            cm = confusion_matrix(self.Y_test, y_pred_classes)
            accuracy = accuracy_score(self.Y_test, y_pred_classes)
            cr = classification_report(self.Y_test, y_pred_classes, target_names=['Not Contacted', 'Contacted'], output_dict=True)

            return history, accuracy, cm, cr
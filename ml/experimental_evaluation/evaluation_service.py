from sklearn.preprocessing import LabelEncoder
from imblearn.over_sampling import SMOTE

from models.DeepLearning.DeepLearning import DeepLearning
from models.GNB.GNB_Optuna import GNB
from models.KNN.KNN_Optuna import KNN
from models.LogisticRegression.Logistic_Reg_Optuna import LogisticRegressionModel
from models.SVC_Linear.SVC_Linear_Optuna import SVC_Linear
from models.SVC_RBF.SVC_RBF_Optuna import SVC_RBF
from models.XGB.XGB_Optuna import XGB

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Shadow
from sklearn.metrics import ConfusionMatrixDisplay
import pypickle
import json

class EvaluationService():
    def __init__(self, csv):
        self.csv = csv
        self.dataset = None
    
    def define_model(self, model, force_model_creation, n_neighbors = None):
        self.model_name = model
        if model == "DeepLearning":
            self.model = DeepLearning(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
        elif model == "GNB":
            self.model = GNB(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
        elif model == "KNN":
            self.model = KNN(X = self.X, Y = self.Y, n_neighbors = n_neighbors, force_model_creation = force_model_creation)
        elif model == "LogisticRegression":
            self.model = LogisticRegressionModel(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
        elif model == "SVC_Linear":
            self.model = SVC_Linear(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
        elif model == "SVC_RBF":
            self.model = SVC_RBF(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
        elif model == "XGB":
            self.model = XGB(X = self.X, Y = self.Y, force_model_creation = force_model_creation)
            
    def plot_distribution(self, label, output_resources_path):
       # Convert the counts to label and 'Not' + label for clarity
        positive_label_count = self.dataset[label].value_counts()
        labels = [label if index == 1 else 'Not ' + label for index in positive_label_count.index]
        sizes = positive_label_count.values
        colors = ['#AAFF32', '#ff0000']  # Green and Red

        # Explode the largest slice
        explode = (0.1 if sizes[0] > sizes[1] else 0, 0.1 if sizes[0] <= sizes[1] else 0)
        fig, ax = plt.subplots(figsize=(10, 7), subplot_kw=dict(aspect="equal"))

        # Create a 2D pie chart with shadow for 3D effect
        wedges, texts, autotexts = ax.pie(sizes,
                                        explode=explode,
                                        labels=labels,
                                        colors=colors,
                                        autopct='%1.1f%%',
                                        startangle=140,
                                        shadow=True,
                                        textprops={'fontsize': 16})

        # Re-draw the shadow with a custom offset to create a 3D-like effect
        for w in wedges:
            s = Shadow(w, -0.01, -0.01)
            s.set_zorder(w.get_zorder() - 0.05)
            ax.add_patch(s)

        # Change the default colors of the autopct texts to white
        for autotext in autotexts:
            autotext.set_color('black')

        # Equal aspect ratio ensures that pie is drawn as a circle (and thus looks like a sphere)
        ax.axis('equal')

        distrubtion_figure = plt.gcf()
        plt.draw()
        distrubtion_figure.savefig(fname=output_resources_path+"label_distribution.png", dpi=100)
        
    def quality(self, label):
        correlation_matrix = self.dataset.corr()
        target_correlation = correlation_matrix[label].sort_values(key=abs, ascending=False)
        print(target_correlation.head(15))
                                   
    def loadAndPreProcess(self, label):
        # Load CSV
        dataset = pd.read_csv(self.csv)
        self.dataset = dataset
        
        dataset = dataset.drop(['session_id'], axis=1)
        dataset = dataset.drop(['city'], axis=1)
        dataset = dataset.drop(['date'], axis=1)

        # Preprocess data
        le = LabelEncoder()
        dataset['gender'] = le.fit_transform(dataset['gender'])
        dataset['browser'] = le.fit_transform(dataset['browser'])
        dataset['operating_system'] = le.fit_transform(dataset['operating_system'])
        dataset['referal_source'] = le.fit_transform(dataset['referal_source'])
        dataset['state'] = le.fit_transform(dataset['state'])


        self.quality(label)
        
        # Data split
        X = dataset.drop(columns=[label])
        Y = dataset[label]

        oversample = SMOTE()
        self.X, self.Y = oversample.fit_resample(X, Y)
    
    def print_and_save_metrics(self, history, accuracy, cm, cr, output_resources_path):
        self.history = history
        self.accuracy = accuracy
        self.cm = cm
        self.cr = cr
        
        self.display_and_save_performance_metrics(output_resources_path)
        self.save_training_and_validation_data(output_resources_path)
        self.save_confusion_matrix(output_resources_path)
        self.save_classification_report(output_resources_path)
    
    def display_and_save_performance_metrics(self, output_resources_path):
        correctly_classified_instances = np.trace(self.cm) / np.sum(self.cm) * 100
        incorrectly_classified_instances = 100 - correctly_classified_instances
        precision = self.cr['weighted avg']['precision']
        recall = self.cr['weighted avg']['recall']
        f1_score = self.cr['weighted avg']['f1-score']
            
        print(f"Test Accuracy: {self.accuracy:.2f}%")
        print(f"Correctly Classified Instances (%): {correctly_classified_instances:.2f}%")
        print(f"Incorrectly Classified Instances (%): {incorrectly_classified_instances:.2f}%")
        print(f"Precision: {precision:.4f}")
        print(f"Recall: {recall:.4f}")
        print(f"F1-score: {f1_score:.4f}")
        print("Confusion Matrix:")
        print(self.cm)
        print("\nClassification Report:")
        print(self.cr)
        
        # Save metrics to a JSON file
        metrics = {
            'accuracy': self.accuracy,
            'correctly_classified_instances': correctly_classified_instances,
            'incorrectly_classified_instances': incorrectly_classified_instances,
            'precision': precision,
            'recall': recall,
            'f1_score': f1_score
        }

        with open(output_resources_path+"metrics.json", 'w') as json_file:
            json.dump(metrics, json_file, indent=4)
        
    def save_training_and_validation_data(self, output_resources_path):
        if self.history == None:
            print("The model was either loaded and not created during this execution, or does not contain loss data")
            return
        
        plt.figure(figsize=(14, 5))
        plt.subplot(1, 2, 1)
        plt.plot(self.history.history['loss'], label='Training Loss')
        plt.plot(self.history.history['val_loss'], label='Validation Loss')
        plt.title('Training and Validation Loss')
        plt.legend()

        plt.subplot(1, 2, 2)
        plt.plot(self.history.history['accuracy'], label='Training Accuracy')
        plt.plot(self.history.history['val_accuracy'], label='Validation Accuracy')
        plt.title('Training and Validation Accuracy')
        plt.legend()
        plt.savefig(output_resources_path + 'training_validation_plot.png', dpi=300)
        
    def save_confusion_matrix(self, output_resources_path):
        disp = ConfusionMatrixDisplay(confusion_matrix=self.cm)
        disp.plot().figure_.savefig(output_resources_path + 'confusion_matrix.png')
        
    def save_classification_report(self, output_resources_path):
        df = pd.DataFrame(self.cr).transpose()
        fig, ax = plt.subplots()
        fig.patch.set_visible(False)
        ax.axis('off')
        ax.axis('tight')
        ax.table(cellText=df.values, colLabels=df.columns, loc='center')
        fig.tight_layout()
        plt.savefig(output_resources_path + 'classification_report.png', dpi=300)
        
    def saveModel(self, save_model_file):
        if(self.model_name == "DeepLearning"):        
            self.model.model.save(save_model_file)
        else:
            pypickle.save(save_model_file, self.model.model)   
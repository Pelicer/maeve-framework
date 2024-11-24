import json
import matplotlib.pyplot as plt
import numpy as np

class ModelComparison():
    def __init__(self):
        print("Model comparison class created")
        
    def plot_comparison(self, use_case):
        # Metric data for models (example values)
        plot_models = ['DeepLearning', 'GNB', 'KNN 1', 'KNN 3', 'KNN 5', 'KNN 7', 'KNN 9', 'LogisticRegression', 'SVC_Linear', 'SVC_RBF', 'XGB']
        plot_models_metrics_path = [
            f'./models/DeepLearning/output_resources/{use_case}/metrics.json',
            f'./models/GNB/output_resources/{use_case}/metrics.json',
            f'./models/KNN/output_resources/{use_case}/1metrics.json',
            f'./models/KNN/output_resources/{use_case}/3metrics.json',
            f'./models/KNN/output_resources/{use_case}/5metrics.json',
            f'./models/KNN/output_resources/{use_case}/7metrics.json',
            f'./models/KNN/output_resources/{use_case}/9metrics.json',
            f'./models/LogisticRegression/output_resources/{use_case}/metrics.json',
            f'./models/SVC_Linear/output_resources/{use_case}/metrics.json',
            f'./models/SVC_RBF/output_resources/{use_case}/metrics.json',
            f'./models/XGB/output_resources/{use_case}/metrics.json'
        ]

        # Example values for each metric (replace with actual data)
        recall = []
        f1_score = []
        precision = []
        accuracy = []

        for model_metric in plot_models_metrics_path:
            with open(model_metric) as json_file:
                metrics_data = json.load(json_file)
                recall.append(metrics_data['recall'])
                f1_score.append(metrics_data['f1_score'])
                precision.append(metrics_data['precision'])
                accuracy.append(metrics_data['accuracy'])

        print(accuracy)

        # Grouping the metrics
        metrics = ['Recall', 'F1-score', 'Precision', 'Accuracy']
        metric_values = [recall, f1_score, precision, accuracy]

        # Number of metrics and models
        num_metrics = len(metrics)
        num_models = len(plot_models)

        # Position of bars on x-axis
        bar_width = 0.1
        group_spacing = 0.3  # Space between metric groups
        indices = np.arange(num_metrics) * (num_models * bar_width + group_spacing)


        # Create figure and axis
        fig, ax = plt.subplots(figsize=(10, 7))

        # Plotting each model with different colored bars
        for i, model in enumerate(plot_models):
            ax.bar(indices + i * bar_width, 
                [recall[i], f1_score[i], precision[i], accuracy[i]], 
                width=bar_width, label=model)

        # Adding labels and title
        ax.set_xlabel('Metrics', fontsize=12)
        ax.set_ylabel('Metric Value', fontsize=12)
        ax.set_title('Model Performance Metrics', fontsize=15)
        ax.set_xticks(indices + bar_width * (num_models / 2 - 0.5))
        ax.set_xticklabels(metrics)
        ax.legend(title='Model', bbox_to_anchor=(1.05, 1), loc='upper left')

        # Adjust layout and save the figure
        plt.tight_layout()

        # Save the plot as a PNG image
        plt.savefig(f'./comparison/{use_case}_performance_metrics.png')

        # Show plot
        plt.show()

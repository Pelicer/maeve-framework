from evaluation_service import EvaluationService

class FantasySoccerUseCase():
    
    def __init__(self, models, force_model_creation):
        self.force_model_creation = force_model_creation
        self.evaluation_service = EvaluationService('./datasets/dataset_fantasy_soccer.csv')    
        self.models = models
        
    def run(self):
        self.evaluation_service.loadAndPreProcess('created_fantasy_team')
        self.evaluation_service.plot_distribution('created_fantasy_team', './datasets/label_distribution/dataset_fantasy_')

        for model in self.models:
            print(f"Running evaluation for {model}")
            resources_output = f"./models/{model}/output_resources/fantasy_soccer_use_case/"
            n_neighbors_list = [1, 3, 5, 7, 9]
            model_extension = 'h5' if model == 'DeepLearning' else 'pkl'
            
            if model == 'KNN':
                for i in n_neighbors_list:
                    print(f"Running KNN with neighbords: {i}")
                    self.evaluation_service.define_model(model = model, force_model_creation = self.force_model_creation, n_neighbors=i)                          
                    history, accuracy, cm, cr = self.evaluation_service.model.train_and_evaluate()
                    self.evaluation_service.print_and_save_metrics(history, accuracy, cm, cr, f"{resources_output}/{i}")
                    self.evaluation_service.saveModel(f"./models/{model}/model/fantasy_soccer_use_case/{model}_model_n_{i}.{model_extension}")
            else:
                self.evaluation_service.define_model(model = model, force_model_creation = self.force_model_creation)                          
                history, accuracy, cm, cr = self.evaluation_service.model.train_and_evaluate()
                self.evaluation_service.print_and_save_metrics(history, accuracy, cm, cr, resources_output)
                self.evaluation_service.saveModel(f"./models/{model}/model/fantasy_soccer_use_case/{model}_model.{model_extension}")
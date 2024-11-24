from use_cases.landing_use_case import LandingUseCase
from use_cases.portfolio_use_case import PortfolioUseCase
from use_cases.fantasy_soccer_use_case import FantasySoccerUseCase
from model_comparison import ModelComparison

# models = ['DeepLearning', 'GNB', 'KNN', 'LogisticRegression', 'SVC_Linear', 'SVC_RBF', 'XGB']

# landing_use_case = LandingUseCase(models=models, force_model_creation=True)
# landing_use_case.run()

# portfolio_use_case = PortfolioUseCase(models=models, force_model_creation=True)
# portfolio_use_case.run()

# fantasy_soccer_use_case = FantasySoccerUseCase(models=models, force_model_creation=True)
# fantasy_soccer_use_case.run()

model_comparison = ModelComparison()
model_comparison.plot_comparison('fantasy_soccer_use_case')
model_comparison.plot_comparison('landing_use_case')
model_comparison.plot_comparison('portfolio_use_case')
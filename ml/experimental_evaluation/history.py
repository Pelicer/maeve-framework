class History:
    def __init__(self):
        self.history = {
            'loss': [],
            'val_loss': [],
            'accuracy': [],
            'val_accuracy': []
        }
    
    def add_epoch(self, loss, val_loss, accuracy=None, val_accuracy=None):
        self.history['loss'].append(loss)
        self.history['val_loss'].append(val_loss)
        if accuracy is not None:
            self.history['accuracy'].append(accuracy)
        if val_accuracy is not None:
            self.history['val_accuracy'].append(val_accuracy)
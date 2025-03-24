import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler


df = pd.read_csv('df_random.csv')
df.drop(['1', '5'], axis = 'columns', inplace=True)
print(df.shape)
X = df.iloc[:, : -1]
scaler = StandardScaler()
scaler.fit(X)
scaler.fit_transform(X)

y = df.iloc[:, -1]
print(X.shape)
print(X.head())
print(y.head())
print(type(X.iloc[:, 1]))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2)
max_acc = -1
n_opt = -1
dep_opt = -1
for num in range(10,50,2):
    for depth in range(1,20,2):
        rf = RandomForestClassifier(n_estimators=num, max_depth=depth)

        rf.fit(X_train, y_train)

        y_pred = rf.predict(X_test)
        max_curr = accuracy_score(y_test, y_pred)
        if max_curr > max_acc:
            dep_opt = depth
            n_opt = num
            max_acc = max_curr

print(f'Best model, num of estimators: {n_opt}, ')
print(f'depth: {dep_opt}')
print(f'Best acc: {max_acc}')
print(rf.feature_importances_)

from sklearn.metrics import ConfusionMatrixDisplay, confusion_matrix
rf = RandomForestClassifier(n_estimators=n_opt, max_depth=dep_opt)
rf.fit(X_train, y_train)

cm = confusion_matrix(y_test, rf.predict(X_test))
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['motivacija','logistika','strategija','bezbednost','mediji','komunikacija'])
disp.plot()
plt.title('Confusion Matrix')
plt.show()



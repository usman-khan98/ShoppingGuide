import pandas as pd
import numpy as np
import re
import sys
import pymongo
from localStoragePy import localStoragePy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
sw_nltk = stopwords.words('english')

databaseClient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.dycul.mongodb.net/fypDB")

dbName = databaseClient.list_database_names()
for name in dbName:
    if name == 'fypDB':
        dbName = name
        
collName = databaseClient[dbName].list_collection_names()
for name in collName:
    if name == 'products':
        collName = name

productNames = databaseClient[dbName][collName].find()
productList = []
for name in productNames:
    productName = name['name']
    productList.append(productName)


# titles = pd.read_csv('D:\dropbox1\Dropbox\FYP\Implementation\Backend\Authentication-Site\Cleaned_Laptop_data.csv')

# features = ['brand', 'model', 'processor_name', 'processor_gnrtn', 'ram_gb', 'ram_type', 'ssd', 'hdd', 'os']

# for feature in features:
#     titles[feature] = titles[feature].fillna('')

# def combined_features(row):
#     return row['brand']+" "+row['model']+" "+row['processor_name']+" "+row['processor_gnrtn']+" gen "+row['ram_gb']+" RAM "+row['ram_type']+" "+row['ssd']+" SSD "+row['hdd']+" HDD"

# titles["product_des"] = titles.apply(combined_features, axis =1)

# # print(titles['product_des'])

cv = CountVectorizer()
count_matrix = cv.fit_transform(productList)

#print("Count Matrix:", count_matrix.toarray())

cosine_sim = cosine_similarity(count_matrix)

#print(cosine_sim)

product_user_likes = sys.argv[1]
# product_user_likes = 'Dell core I7 5th Gen Silver elitebook'
words = [word for word in product_user_likes.split() if word.lower() not in sw_nltk]
product_user_likes = " ".join(words)

def get_index_from_title(title):
  for i in range(0,len(productList)):
    product = productList[i]
    if(re.search(title, product )):
      return i 

product_index = get_index_from_title(product_user_likes)
#print(movie_index)

similar_products = list(enumerate(cosine_sim[product_index]))
# print(similar_products)

sorted_similar_products = sorted(similar_products, key=lambda x:x[1], reverse=True)
# print(sorted_similar_products)

def get_title_from_index(index):
    for i in range(len(productList)):
        if i == index:
            return productList[i]
        
i =0
products = []
for pro in sorted_similar_products:
    if(i<=2):
        products.append(get_title_from_index(pro[0]))
    i=i+1
    if i == len(sorted_similar_products)-2:
        products.append(get_title_from_index(pro[0]))
        break

print(products)
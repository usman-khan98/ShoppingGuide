from nltk.sentiment.vader import SentimentIntensityAnalyzer
from tokenize import Double
from textblob import TextBlob
import csv
import nltk
nltk.download('vader_lexicon')

reviews = []


with open('electronics_sample.csv', 'r') as data:
    csv_reader = csv.reader(data)
    next(csv_reader)
    # print(csv_reader)
    for text in csv_reader:
        # print(text[3])
        reviews.append(text[3])

positive = 0
negative = 0
neutral = 0
polarity = 0
review = []
pos_list = []
neg_list = []
neu_list = []

for rev in reviews:
    review.append(rev)
    analysis = TextBlob(rev)
    # print(analysis)
    score = SentimentIntensityAnalyzer().polarity_scores(rev)
    # print(score)
    neg = score["neg"]
    pos = score["pos"]
    neu = score["neu"]
    comp = score["compound"]
    polarity += analysis.sentiment.polarity
    if (neg > pos):
        neg_list.append(rev)
        negative += 1
    elif (pos > neg):
        pos_list.append(rev)
        positive += 1
    else:
        neu_list.append(rev)
        neutral += 1


def getPercentage(rev_num, total):
    percentage = (rev_num/total)*100
    return percentage


print(format(getPercentage(positive, 19810), '.1f'), "positive reviews\n", getPercentage(
    negative, 19810), "negative reviews\n", getPercentage(polarity, 19810))

import json
import sys
import time
from selenium import webdriver
import selenium
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# products = {"Names": [], "Prices": [], "Urls": [], "Images": []}

products = {"ProductNames": [], "ProductPrices": [],
            "ProductUrl": [], "ProductImages": []}


query = str(sys.argv[1])

driver = webdriver.Chrome("chromedriver.exe")

# driver.set_window_position(-10000, 0)

driver.get("https://www.daraz.pk/")

search_bar = driver.find_element(
    By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div/div[2]/div/div[2]/form/div/div[1]/input[1]")

search_bar.send_keys(query, Keys.ENTER)

# prices
prices = driver.find_elements(
    By.CSS_SELECTOR, "div.price--NVB62 > span")
index = 1
for index in prices:
    products["ProductPrices"].append(index.text)


# names
names = driver.find_elements(
    By.CSS_SELECTOR, "div.info--ifj7U > div.title--wFj93 > a:first-child")
index = 1
for index in names:
    products["ProductNames"].append(index.get_attribute("title"))


# url
url = driver.find_elements(
    By.CSS_SELECTOR, "div.info--ifj7U > div.title--wFj93 > a:first-child")
index = 1
for index in url:
    products["ProductUrl"].append(index.get_attribute("href"))

# img
img = driver.find_elements(
    By.CSS_SELECTOR, "div.img--VQr82 > div.mainPic--ehOdr > a > img:first-child")
index = 1
for index in img:
    products["ProductImages"].append(index.get_attribute("src"))


# with open('daraz.json', 'w') as fp:
#     json.dump(products, fp, indent=4)

print(json.dumps(products))

driver.quit()

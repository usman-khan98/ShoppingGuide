import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

products = {"Names": [], "Prices": [], "Urls": [], "Images": []}

query = "Samsung Galaxy"

driver = webdriver.Chrome("D:\Softwares\chromedriver_win32\chromedriver.exe")

driver.get("https://www.daraz.pk/")

driver.set_window_position(-10000, 0)

search_bar = driver.find_element(
    By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div/div[2]/div/div[2]/form/div/div[1]/input[1]")

search_bar.send_keys(query, Keys.ENTER)

# prices
prices = driver.find_elements(By.CLASS_NAME, "currency--GVKjl")
index = 1
for index in prices:
    products["Prices"].append(index.text)


# names
names = driver.find_elements(
    By.CSS_SELECTOR, "div.info--ifj7U > div.title--wFj93 > a:first-child")
index = 1
for index in names:
    products["Names"].append(index.get_attribute("title"))


# url
url = driver.find_elements(
    By.CSS_SELECTOR, "div.info--ifj7U > div.title--wFj93 > a:first-child")
index = 1
for index in url:
    products["Urls"].append(index.get_attribute("href"))


# img
img = driver.find_elements(
    By.CSS_SELECTOR, "div.img--VQr82 > div.mainPic--ehOdr > a > img:first-child")
index = 1
for index in img:
    products["Images"].append(index.get_attribute("src"))
    print(index.get_attribute("src"))


with open('daraz.json', 'w') as fp:
    json.dump(products, fp, indent=4)


driver.quit()

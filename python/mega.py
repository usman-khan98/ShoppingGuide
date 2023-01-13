import json
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

products = {"Names": [], "Prices": [], "URLs": [], "Images": []}


query = "Samsung Galaxy"

driver = webdriver.Chrome("D:\Softwares\chromedriver_win32\chromedriver.exe")

driver.get("https://www.mega.pk/")

#driver.set_window_position(-10000, 0)

search_bar = driver.find_element(By.ID, "searchq")

search_bar.send_keys(query, Keys.ENTER)
time.sleep(3)


# lazy loading images
last_height = 500
while True:
    driver.execute_script(
        "window.scrollTo(0, "+str(last_height)+");")
    time.sleep(2)
    if last_height == 3500:
        break
    last_height = last_height + 500


# names
names = driver.find_elements(By.CSS_SELECTOR, "#lap_name_div > h3 > a")
index = 1
for index in names:
    products["Names"].append(index.text)


# prices
prices = driver.find_elements(By.CLASS_NAME, "cat_price")
index = 1
for index in prices:
    products["Prices"].append(index.text)


# url
urls = driver.find_elements(By.CSS_SELECTOR, "#lap_name_div > h3 > a")
index = 1
for index in urls:
    products["URLs"].append(index.get_attribute("href"))


# img
img = driver.find_elements(
    By.CSS_SELECTOR, "div.wrapper1 > a > img:first-child")
index = 1
for index in img:
    products["Images"].append(index.get_attribute("src"))


with open('mega.json', 'w') as fp:
    json.dump(products, fp, indent=4)


driver.quit()

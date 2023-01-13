import sys
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json

products = {"ProductNames": [], "ProductPrices": [],
            "ProductUrl": [], "ProductImages": []}
driver = ""

query = str(sys.argv[1])


## Daraz.pk, Mega.pk, ishopping.pk, homeshopping

# For homeshopping

driver = webdriver.Chrome("D:\Softwares\chromedriver_win32\chromedriver.exe")

driver.get("https://homeshopping.pk/")

driver.set_window_position(-10000, 0)

input = driver.find_element(
    By.XPATH, "/html/body/div[1]/header/div[1]/div/div[2]/form/div/input[2]")

input.send_keys(query, Keys.ENTER)

# scroll to add new products
SCROLL_PAUSE_TIME = 3
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    driver.execute_script(
        "window.scrollTo(0, "+str(last_height-1430)+");")
    time.sleep(SCROLL_PAUSE_TIME)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height


# Product Names
names = driver.find_elements(By.CLASS_NAME, "ProductDetails")
index = 1
for index in names:
    products["ProductNames"].append(index.text)


# Product Prices
index = 1
prices = driver.find_elements(By.CLASS_NAME, "ActualPrice")
for index in prices:
    # print(index.text)
    products["ProductPrices"].append(index.text)


# Product Urls
index = 1
urls = driver.find_elements(
    By.CSS_SELECTOR, "#frmCompare > div > div.ProductList.Clear > div.innerp.product-box > figure > a:first-child")
for index in urls:
    products["ProductUrl"].append(index.get_attribute("href"))


# Product Images
index = 1
img = driver.find_elements(By.CLASS_NAME, "img-responsive.imgcent")
for index in img:
    products["ProductImages"].append(index.get_attribute("src"))


print(products)


# with open('homeshopping.json', 'w') as fp:
#     json.dump(products, fp, indent=4)

driver.quit()

import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import json

newDetails = {
    "image": [],
    "review": []
}


url = str(sys.argv[1])


driver = webdriver.Chrome("chromedriver.exe")

driver.set_window_position(-10000, 0)
driver.get(url)


input = driver.find_element(
    By.CSS_SELECTOR, "body > div > div.container.min-w1170 > div > div.col-md-9.col-xs-12 > div > div > ul > li:nth-child(2) > a")


ActionChains(driver).move_to_element(input).click(input).perform()


reviews = driver.find_element(
    By.CSS_SELECTOR, "#ProductReviews_Tab > div > p")

image = driver.find_element(
    By.CSS_SELECTOR, "#prodcut-desc > div.col-md-5.pad0 > div > div > div.gc-display-area > div.gc-display-container > img")

newDetails["image"].append(image.get_attribute("src"))

newDetails["review"].append(reviews.text)


# print(reviews.text)

print(json.dumps(newDetails))

driver.quit()

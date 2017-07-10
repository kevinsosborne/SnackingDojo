from lxml import html
import requests
import re
import json
from bs4 import BeautifulSoup


#https://www.instacart.com/store/costco/departments/107/aisles/690
#create array that will hold all food objects
foodObjects = []
foodCat = ["Chips & Pretzels", "Nuts, Seeds & Dried Fruit", "Candy & Chocolate", "Cookies & Cakes", "Crackers", "Energy & Granola Bars", "Popcorn & Jerky","Trail Mix & Snack Mix","Fruit & Vegetable Snacks"]
def getItemsFromPage():
    #opens file from hardcoded location
    #cannnot get info live without logging in
    #https://superuser.com/questions/290247/how-to-delete-all-lines-in-notepad-except-lines-containing-a-word-i-need
    #find 'react-views-container' line is the important line(s)
    soup = BeautifulSoup(open("C:\\htmlFile.txt"), "lxml")
    #for all li tags with class item-card
    #increment = 0
    #for ite in soup.getText():
        #if(ite == "*"):
            #increment+=1
            #print(foodCat[increment-1])
            for li in soup.findAll('li', {"class":'item-card'}):
                foodObj = {}
                #for all img tags in li tags
                for x in li.findAll('img'):
                    foodObj['img'] = x['src']
                    foodObj['name'] = x['alt']
                    print(x['alt'])
                    foodObjects.append(foodObj)
            
getItemsFromPage()
#save to snacks.json
file = open('snacks.json', 'w')
file.write(json.dumps(foodObjects))
file.close()

# Test for Intercom

* What's your proudest achievement? It can be a personal project or something you've worked on professionally. Just a short paragraph is fine, but I'd love to know why you're proud of it, what impact it had (If any) and any insights you took from it.

I have been Co-founder and CTO of my own company where I developed 2 plugins for blogs and 2 platforms. The first plugin I developed is for music industry, it recognizes artists in articles and enhance the page by adding a tooltip over the artist name when you hover it and let you listen to the top 5 song of the artist and check if there is a concert near you coming soon. I am pretty proud of this first plugin because we installed it on more than 15 different blogs with more than 45 thousand monthly unique users. Moreover, we had a great feedback from the blogs owner that it attracts more people and they were staying longer on their website. On the technical side, I am also proud of my work as I had to face challenges that I have never encounter before in order to give a very light plugin to the websites that load fast and seamlessly to only improve the user experience.

* Write a function that will flatten an array of arbitrarily nested arrays of integers into a flat array of integers. e.g. [[1,2,[3]],4] → [1,2,3,4]. If the language you're using has a function to flatten arrays, you should pretend it doesn't exist.

See File flatten.js

* We have some customer records in a text file (customers.json) -- one customer per line, JSON-encoded. We want to invite any customer within 100km of our Dublin office for some food and drinks on us. Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).
	- You can use the first formula from this [Wikipedia article](https://en.wikipedia.org/wiki/Great-circle_distance) to calculate distance. Don't forget, you'll need to convert degrees to radians.
	- The GPS coordinates for our Dublin office are 53.3381985, -6.2592576.
	- You can find the Customer list [here](https://gist.github.com/brianw/19896c50afa89ad4dec3).

See file filterCustomersByDistance.js

## How to run the files

If you have node installed, just run:
`node filename.js`

Otherwise, you can use the console developer of Google Chrome and copy the content of the file in the Console tab.

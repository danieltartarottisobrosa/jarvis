# Jarvis

Your personal assistent that you can teach anything you want!

## The goal

Allow you to create an imperative API to your library

## Use case

If you want to use your API like this:

```javascript
const button = document.querySelector("#myButton")

Jarvis.disable.the.button(btn).now()
```

or this:

```javascript
const user = Jarvis.logout.the.logged.user.now()
console.log(`The user ${user.username} was logged out`)
```

Now you can!!!

## How

```javascript
Jarvis.register("disable.the.button(btn)", input => {
	input.btn.disabled = true
})
```

and respectively

```javascript
Jarvis.register("logout.the.logged.user", input => {
	const user = MySession.loggedUser
	MySession.loggedUser = null
	return user
})
```

## More of Jarvis

### Cloning

```javascript
const Alfred = Jarvis.create()

Alfred.register("let.me.do.what.I.want", input => {
	// Some code ...
})


// Use
Alfred.let.me.do.what.I.want.now()

```

### Optional properties

```javascript

Jarvis.register(
	"make.me.a.sandwich.of(mainIngredient)",
	[ "cheese", "sauce", "bread" ],
	input => {
		// Some code ...
	}
)


// Use
Jarvis.make.me.a.sandwich.of("bacon").now()
// or
Jarvis.make.me.a.sandwich.of("bacon").cheese("gorgonzola").now()
// or
Jarvis.make.me.a.sandwich.of("bacon").cheese("gorgonzola").sauce("barbecue").now()
// ...
```

### Multi constructor

```javascript

Jarvis.register(
	"load.resources.from.xlsx.file(xlsFile)"
	"load.resources.from.csv.file(csvFile)",

	input => {
		// Some code ...
	}
)


// Use
Jarvis.load.resources.from.xlsx.file("file.xlsx").now()
// or
Jarvis.load.resources.from.csv.file("file.csv").now()
// ...
```

### Change the NOW method name

```javascript

Jarvis.options.executeMethodName = "please"

Jarvis.register("create.a.file.called(filename)", input => {
	// Some code ...
})

// Use
Jarvis.create.a.file.called("new-file.txt").please()
```

## Examples

* [Live example on codepen](http://codepen.io/danieltartarottisobrosa/pen/GZmwNz?editors=0010)

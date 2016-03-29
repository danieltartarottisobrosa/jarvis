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
console.log(`The user ${uesr.username} was logged out`)
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
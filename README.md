Right now in the cycle.js environment the biggest issue I have is how to deal with nested components or a nested structure of an application period.  One solution is to do as cycle.js does in a nutshell: create a proxy, add data to that proxy, loop it around.  The problem I have with this is it requires the state of your application to be wrong just a little bit of the time, which makes it harder for me to reason about.

Rather than going the route of a solution like f( g( proxy-f )) I propose… f( x, y ).  It is not a new idea, but the question is how to do it?

I propose that anytime you create a parent child relationship, where the children are dependent on each others data, I suggest the follow design.

```
fun child(driver, props):
    return {
        intent from driver,
        view with props
}

fun parent(driver, props) {
  let all = child(driver, props)
  let state$ = model(all.intent)
  let vtree$ = view(all.view)
  return {
    driver: vtree$
  }
}
```

the following is an illustration of this design

<img src="https://cloud.githubusercontent.com/assets/8505062/14648862/f9c99cb0-0629-11e6-9ba6-35b39bb231de.png" />

If you want to reference examples I have create please download and play

run these

```
npm install
```
```
gulp
```

and you are good to go
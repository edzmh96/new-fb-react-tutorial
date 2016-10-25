# new-fb-react-tutorial
Learning more about React; using create-react-app to start off the project
TODO: the [extra work](https://facebook.github.io/react/tutorial/tutorial.html#wrapping-up) in the tutorial!

### States
- Each state is private to a component
- When state is changed, the component refreshes
- we can initialize the state in the constructor of the component like so:
```javascript
class Square extends React.Component {
  constructor() {
    //explicitly call super when defining constructor of subclass in JS
    super();
    //each state is private to a specific component
    //initial value of state is null
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}
```
- Component.setState is a function that changes the current state

### Props
- Props are used to pass values from parent to children classes
- Often when we refactor code involving two or more children aggregating data and we want to keep them in sync, we can pull the state up to the parent and use props in the children so that the parent can be the one setting the props and keeping the aggregated data in sync
```javascript
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
```
- As above, we can pass anything as props to the component, including functions.
- We can access the props in Square like so:
```javascript
  //inside class Square
  var value = this.props.value;
  this.props.onClick() //calls onClick which calls this.handleClick(i)
```

### About the components
- React elements are JS Objects, so they can be passed around:
```javascript
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move:
        'Game start';
      return (
        <li>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    });
```

... then used in rendering later

```javascript
    //return in render of another class

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <!-- used here -->
          <ol>{moves}</ol>
        </div>
      </div>
    );
```
- "key" is a special property reserved by React to use in components generated in an array/iterator
- keys should be unique relative to the siblings
- React uses 'key' as a property to determine which item in the array/list it should render, so if we're just shifting elements around it doesn't re-render
- likewise, changing the key will cause the component to be destroyed and recreated
- don't use the index of the array as a key, the key should be unique relative to the item's siblings in the array and doesn't change when items are shuffled
- key cannot be accessed through this.props.key, even though it's a property
- define key like so: 
```javascript
<someClass key={somekey}></someClass>
```
someClass can be a custom React component class or default html classes like 
```javascript
<li></li> and <a></a>
```

### Other stuff learnt in this process

#### Immutability
It means changing data by replacing it with a copy.
Why is this important?
- There's another way of changing data: simply by mutating the existing object
- Determining if a mutated object has changed is complex because it requires comparing current object to a previous copy, traversing down entire object tree, comparing each variable/value
- Determining how immutable object changed: If the referenced object is different from before, it has changed. Fast detection
- Look at [Immutability.js](https://facebook.github.io/immutable-js/)





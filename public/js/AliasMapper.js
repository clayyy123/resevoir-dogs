// AliasMapper controller

class AliasMapper extends Stimulus.Controller {
  static get targets() {
    return ['form', 'alias', 'name', 'chosen', 'output', 'is'];
  }

  initialize() {
    this.formTarget.addEventListener('submit', e => e.preventDefault());

    console.info('TODO: implement AliasMapper controller');
  }

  //populate the alias and name fields
  populate = (alias, name) => {
    this.aliasTarget.innerText = alias;
    this.nameTarget.innerText = name;
  };

  timeout = null;

  //takes in cb(callback) and the alias and its name to populate during fade in and out transitions.
  fade = (cb, alias, name) => {
    // clearInterval(this.timeout);
    // this is for the first case when the pages loads
    if (this.aliasTarget.className === 'name output-hidden') {
      cb(alias, name);
      this.aliasTarget.classList.remove('output-hidden');
      this.aliasTarget.classList.add('output-show');
      setTimeout(() => {
        this.isTarget.classList.remove('output-hidden');
        this.isTarget.classList.add('output-show');
      }, 1000);
      setTimeout(() => {
        this.nameTarget.classList.remove('output-hidden');
        this.nameTarget.classList.add('output-show');
      }, 2000);
    } else {
      // this case is when someone is clicked we need to hide it, populate the fields, and then show it
      this.aliasTarget.classList.remove('output-show');
      this.aliasTarget.classList.add('output-hidden');
      this.nameTarget.classList.remove('output-show');
      this.nameTarget.classList.add('output-hidden');
      this.isTarget.classList.remove('output-show');
      this.isTarget.classList.add('output-hidden');
      timeout = setTimeout(() => {
        cb(alias, name);
        this.aliasTarget.classList.remove('output-hidden');
        this.aliasTarget.classList.add('output-show');
        setTimeout(() => {
          this.isTarget.classList.remove('output-hidden');
          this.isTarget.classList.add('output-show');
        }, 1000);
        setTimeout(() => {
          this.nameTarget.classList.remove('output-hidden');
          this.nameTarget.classList.add('output-show');
        }, 2000);
      }, 2500);
    }
  };

  // fetch request to the php file which will then return the name of the alias
  get aliasName() {
    // if (!this.aliasName && !this.nameTarget)
    const alias = this.chosen;
    if (alias === 'Mr. Purple') {
      return this.fade(this.populate, alias, '<unknown>');
    }
    fetch(`/api/endpoint.php?query=${alias}`).then(response =>
      response.text().then(data => {
        this.fade(this.populate, alias, data);
      })
    );
  }

  //the function for the click event
  getChosen() {
    this.aliasName;
  }

  //grabs the value of the chosen alias
  get chosen() {
    return this.chosenTarget.value;
  }
}

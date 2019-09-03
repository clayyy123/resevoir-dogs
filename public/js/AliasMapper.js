// AliasMapper controller

class AliasMapper extends Stimulus.Controller {
  static get targets() {
    return ['form', 'alias', 'name', 'chosen'];
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

  // fetch request to the php file which will then return the name of the alias
  get aliasName() {
    const alias = this.chosen;
    if (alias === 'Mr. Purple') {
      return this.populate(alias, '<unknown>');
    }
    fetch(`/api/endpoint.php?query=${alias}`).then(response =>
      response.text().then(data => this.populate(alias, data))
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

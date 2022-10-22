import { v4 as uuidv4 } from 'uuid';

class Node {
  id;
  name;
  childeren;
  options = {isFile: true, isOpen: false};

  constructor (name, childeren = [], options = {}) {
    this.id = uuidv4();
    this.name = name;
    this.childeren = childeren;
    this.options.isFile = options.isFile ?? true;
    this.options.isOpen = options.isOpen ?? false;
  }
}

export default Node;
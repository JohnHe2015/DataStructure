//广义表使用到的stack
function Stack() {
	var itemArr = [];

	this.push = function(item) {
		itemArr.push(item);
	};

	this.pop = function() {
		return itemArr.pop(itemArr.length - 1);
	};

	this.top = function(){
		return itemArr[itemArr.length -1];
	};
	this.isEmpty = function() {
		return itemArr.length == 0 ? true : false;
	};

	this.clear = function() {
		itemArr = [];
	};

	this.size = function(){
		return itemArr.length;
	};
}

//定义树的节点
var binTreeNode = function(data){
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
  this.parentNode = null;
};

function BinaryTree(){
  var root = null;
  //使用广义表初始化二叉树   A(B(D,E(G,)),C(,F))#
  this.initTree = function(string){
    var stack = new Stack();
    var k = 0;
    var new_node = null;
    for(var i=0;i < string.length;i++)
    {
      var item = string[i];
      if(item == "#")
      {
        break;
      }
      if(item == "(")
      {
        k = 1; //标识下一个元素为左子树
        stack.push(new_node);
      }
      else if(item == ",")
      {
        k = 2;
      }
      else if(item == ")")
      {
        stack.pop();
      }
      else
      {
        new_node = new binTreeNode(item);
        if(root == null)
        {
          root = new_node;
        }
        else if(k == 1)
        {
          //左子树
          var top_item_l = stack.pop();
          new_node.parentNode = top_item_l;
          top_item_l.leftChild = new_node;
        }
        else
        {
          //右子树
          var top_item_r = stack.pop();
          new_node.parentNode = top_item_r;
					top_item_r.rightChild = new_node;
        }

      }
    }
  };
}
 var new_tree = new BinaryTree();
 new_tree.initTree('A(B(D,E(G,)),C(,F))#');
//遍历二叉树

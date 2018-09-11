//define class Queue
function Queue(){
	var queueArr = [];

	this.enqueue = function(item){
		queueArr.push(item);
	};

	this.dequeue = function()
	{
		return queueArr.shift();
	};

	this.clear = function(){
		queueArr = [];
	};

	this.isEmpty = function(){
		return queueArr.length == 0;
	};

	this.head = function(){
		return queueArr[0];
	};

	this.size = function(){
		return queueArr.length;
	};

	this.tail = function(){
		return queueArr[queueArr.length-1];
	};

	this.print = function(){
		console.log(queueArr);
	};
}


//define class Stack
function Stack(itemArr) {
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

	this.print = function(){
		console.log(itemArr);
	};
}

/****************约瑟夫环***************/

function init_data(){
	var a = [];
	for(var i =0;i<100;i++)
	{
		a[i] = i;
	}
	return a;
}


function ysf_ring(){
	var queue = new Queue();
	var arr_data = init_data();

//压数据进队列
	for(var i =0;i < arr_data.length;i++)
	{
		queue.enqueue(arr_data[i]);
	}
//
	var index = 0;
	while(queue.size() != 1)
	{
		var head = queue.dequeue();
		index += 1;
		if(index % 3 != 0)
		{
			queue.enqueue(head);
		}
	}

	return queue.head();	
}


//test
console.log("约瑟夫环的值	: "+ysf_ring());


/****************************************/


/*********斐波那契数列(队列)***************/
function fbnq_arr(n){
	var queue = new Queue();

	var arr = [1,1];
	var index = 0;

	queue.enqueue(1);
	queue.enqueue(1);
	while(index < n-2) //循环次数
	{
		index += 1;
		var head = queue.dequeue();
		var tail = queue.tail();
		var sum = head + tail;
		queue.enqueue(sum);
		arr.push(sum);
	}

	return arr;
}

//test
console.log("斐波那契数列: " +fbnq_arr(15));



/****************************************/



/*********两个队列实现一个栈***************/

function Merge_queue_to_stack(){
	var queue1 = new Queue();
	var queue2 = new Queue();

	var data_queue = queue1;
	var null_queue = queue2;

	var init = function(){
		if(queue1.size() == 0 && queue2.size() == 0)
		{
			data_queue = queue1;
			null_queue = queue2;
		}
		else if(queue1.size() > 0)
		{
			data_queue = queue1;
			null_queue = queue2;
		}
		else if(queue2.size() > 0)
		{
			data_queue = queue2;
			null_queue = queue1;
		}
	};

	this.push = function(item){
		init();
		data_queue.enqueue(item);
	};

	this.pop = function()
	{
		init();
		//把除去队列尾的所有数据转移到空队列中,随后弹出队列尾元素
		//此时空队列变成数据队列,实现了pop功能
		for(var i = 0;i < data_queue.size();i++)
		{
			var temp = data_queue.dequeue();
			null_queue.enqueue(temp);
		} 
		return data_queue.dequeue();//弹出队列最后个元素并返回
	};

	this.top = function(){
		return data_queue.tail();
	};

	this.print = function(){
		init();
		return data_queue.print();
	};
}

//test
var newStack = new Merge_queue_to_stack();
console.log("------------------------------------");
console.log("两个队列实现一个栈..");
console.log("压1,2,4进栈");
newStack.push(1);
newStack.push(2);
newStack.push(4);
newStack.print();
console.log("栈顶元素: " + newStack.top()); 
newStack.pop();
console.log("栈顶元素出栈.."); 
newStack.print();
console.log("------------------------------------");



/****************************************/



/*********两个栈实现一个队列***************/
function Mrege_stack_to_queue(){
	var stack1 = new Stack();
	var stack2 = new Stack();

	//数据最终一直都在stack1,所以无需init

	this.enqueue = function(item){
		stack1.push(item);
	};


	//pop出stack1的数据push进stack2 , pop stack2的头(队列dequeue的元素)
	//接着pop stack2的数据倒回 push进stack1
	this.dequeue = function(){
		if(stack1.isEmpty())
		{
			return;
		}
		while(!stack1.isEmpty())
		{
			var temp = stack1.pop();
			stack2.push(temp);
		}
		var dequeueElement = stack2.pop();

		while(!stack2.isEmpty())
		{
			var temp = stack2.pop();
			stack1.push(temp);
		}

		return dequeueElement; //返回弹出队列的元素
	};

	this.tail = function(){
		return stack1.top();
	}

	this.size = function(){
		return stack1.size();
	}

	this.print = function(){
		return stack1.print();
	}

}

//test
var newQueue = new Mrege_stack_to_queue();
console.log("两个栈实现一个队列..");
console.log("压1,2,4进队列");
newQueue.enqueue(1);
newQueue.enqueue(2);
newQueue.enqueue(4);
newQueue.print();
console.log("队尾元素: " + newQueue.tail());
console.log("元素出队列.."); 
console.log("弹出元素为: "+newQueue.dequeue());
 
newQueue.print();
console.log("压5进队列");
newQueue.enqueue(5);
newQueue.print();
console.log("元素出队列..");
console.log("弹出元素为: "+newQueue.dequeue());
newQueue.print();
console.log("------------------------------------");




/****************************************/


/*****************迷宫问题***************/
/*
para1: 二维数组
para2: 二维数组的开始坐标
para3: 二维数组的结束坐标

return : 最短路径坐标(数组)

*/

function Point(x,y,flag){
	this.x:x,
	this.y:y,
	this.flag:flag
}

function maze(two_dim_arr,start_x,start_y,end_x,end_y){
	//打印数组函数
	var print = function(){
		console.log(two_dim_arr);
	};
	var queue = new Queue();
	var start_point = new Point(start_x,start_y,false);
	var step = 0; //步数
	var rowLen = two_dim_arr.length; //行数
	var columnLen = two_dim_arr[0].length; //列数

	queue.enqueue(start_point);


	while(!queue.isEmpty())
	{

	var currentX = queue.head().x;
	var currentY = queue.head().y;
	var currentVal = two_dim_arr[currentX][currentY];
	var left = currentY > 0 ? two_dim_arr[currentX][currentY-1] : null;
	var right = currentY < columnLen-1 ? two_dim_arr[currentX][currentY+1] : null;
	var on = currentX > 0 ? two_dim_arr[currentX-1][currentY] : null;
	var under = currentX < rowLen-1 ? two_dim_arr[currentX+1][currentY] : null;
	// var round = [];
	// round.push(left,on,right,under);
	if()

	


	print();
	queue.print();
	}
}


//test
var maze_array = [
[0, 0, 1, 0, 0, 0, 0],
[0, 0, 1, 1, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0],
[0, 0, 0, 1, 1, 0, 0],
[1, 0, 0, 0, 1, 0, 0],
[1, 1, 1, 0, 0, 0, 0],
[1, 1, 1, 0, 0, 0, 0]
];

var start_x = 2;
var start_y = 1;
var end_x = 3;
var end_y = 5;

maze(maze_array,start_x,start_y,end_x,end_y);

/****************************************/

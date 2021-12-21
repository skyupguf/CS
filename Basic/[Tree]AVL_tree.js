class AVLTree {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }

    addNode(data) {
        if (!this.value) return new AVLTree(data);

        if (data < this.value) {
            this.left 
            ? this.left.addNode(data)
            : this.left = new BinarySearchTree(data);
        
        } else if (data > this.value) {
            this.right 
            ? this.right.addNode(data) 
            : this.right = new BinarySearchTree(data);
            
        } else return;
    }
    
    checkNode(data) {
        if (data === this.value) return true;
        else if (data < this.value && this.left) return this.left.checkNode(data);
        else if (data > this.value && this.right) return this.right.checkNode(data);
        else return false;
    }

    deleteNode(root, data) {
        if (data < root.value) {
            root.left = this.deleteNode(root.left, data);
        
        } else if (data > root.value) {
            root.right = this.deleteNode(root.right, data);
        
        } else {
            if (!root.left) return root.right;
            else if (!root.right) return root.left;
            else {
                let min = root.right;
                while (min.left) min = min.left;
                [ root.value, min.value ] = [ min.value, root.value ];
                root.right = this.deleteNode(root.right, data);
            }
        }
        return root;
    }
    
    preorder(callback) {
        callback(this.value);
        if (this.left) this.left.preorder(callback);
        if (this.right) this.right.preorder(callback);
    }
  
    inorder(callback) {
        if (this.left) this.left.inorder(callback);
        callback(this.value);
        if (this.right) this.right.inorder(callback);
    }
  
    postorder(callback) {
        if (this.left) this.left.postorder(callback);
        if (this.right) this.right.postorder(callback);
        callback(this.value);
    }
}
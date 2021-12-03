Vue.component('list-items', {
        props:['todos'],
        methods:{
          del:function(index){
            this.$emit('del',index)
          },
          edit:function(value,index){
            this.$root.$emit('message-from-list-items',value,index)
          }
        },
      template: `
      <div class="list-items">
       <transition-group name="slide-fade">
    <div v-for='(todo,index) in todos' class="list-item" :key="index+1">
      <div class="item-text">{{ todo }}</div>
      <div class="item-edit"><button v-on:click="edit(todo,index)"><i class="bi bi-pencil-square"></i></button></div>
      <div class="item-delete"><button v-on:click="del(index)"><i class="bi bi-trash-fill"></i></button></div>
    </div>
  </transition-group>
  </div>
      `
    })
      Vue.component('form-input', {
        data:function(){
          return {
            value:'',
            index:null
          }
        },
        methods:{
          add:function(){
            if(this.index === null){
              this.$emit('add',this.value)
              this.value = ''
            }else{
              this.$emit('edit',this.value,this.index)
              this.value = ''
              this.index = null
            }
          }
        },
        mounted:function(){
          this.$root.$on('message-from-list-items',(msg,index)=>{
            this.value = msg
            this.index = index
          })
        }
        ,
      template: `
        <div class="form-input">
    <input type="text" v-model='value' v-on:keyup.enter="add">
    <button @click="add"><i class="bi bi-plus-circle"></i></button>
  </div>
      `
    })
    let todos = [
      'pergi kepasar',
      'main game'
    ]

      const app = new Vue({
        el:'#app',
        data:{
          todos
        },
        methods:{
          add:function(text){
            this.todos.push(text)
          },
          del:function(index){
            this.todos.splice(index,1)
          },
          edit:function(value,index){
            this.todos = this.todos.map((v,i)=>{
                if(i==index){
                  v = value
                }
                return v
            })
          }
        }
      })

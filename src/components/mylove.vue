<template>
<div>
  <button type="button" class="btn btn-light mylove" data-bs-toggle="modal" data-bs-target="#myLoveModal">
    <img src="@/assets/images/icon_like.png" width="20" class="mx-1">
    <label>我的最愛</label>
  </button>

<div class="modal fade" id="myLoveModal" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">我的最愛</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 mb-4" v-for="(item,index) in myLove" :key="index">
            <div class="card w-100 h-100">
          <div class="card-body pb-2">
            <img v-if="item.photoUrl" :src="item.photoUrl" class="card-img-top" style="height:190px">
            <img v-else src="@/assets/images/presetImage.png" class="card-img-top" style="height:190px">
            <div style="height:100px;">
              <h5 class="card-title px-2 py-2 text-omit" style="max-width: 350px;">{{item.name}}</h5>
              <div class="d-flex align-items-center">
                <img v-if="item.address" class="ms-2" src="@/assets/images/icon_location_blue.svg" width="28"><label class="card-text text-omit" style="color:#2A48FF;  max-width: 300px;">{{item.address}}</label>
              </div>
            </div>
            <p v-if="item.info" class="badge bg-info text-light mx-2 text-omit" style="max-width:200px;"> {{item.info}}</p>       
          </div>
        </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  computed: {
    myLove () {
      return this.$store.state.myLove;
    }
  }
}
</script>

<style scoped>
.mylove{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 6px;
  color: #959595;
}

.modal-content{
  background:#F1F1F1;
}
.modal-header{
  border:0;
}
.card-body{
  padding:0 ;
}
.text-omit{
  overflow : hidden; 
  text-overflow : ellipsis; 
  white-space : nowrap; 
}
</style>

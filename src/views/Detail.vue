<template>
<div class="container-fluid">
  <div class="row py-4 mx-5">
    <div class="col-6">
      <img src="@/assets/images/icon_logo_blue.png" class="mobile-img">
    </div>
    <div class="col-6 d-flex justify-content-end">
      <Mylove></Mylove>
    </div>
  </div>
  <div class="desktop-see">
    <div class="banner d-flex align-items-end ps-5" :style="{backgroundImage:`url(${imgUrl[singleData.type]})`}">
    <div class="title-content">
      <h2 v-if="singleData.type == 0" class="title ms-5 mb-3">景點</h2>
      <h2 v-if="singleData.type == 1" class="title">餐飲</h2>
      <h2 v-if="singleData.type == 2" class="title">旅宿</h2>
      <h2 v-if="singleData.type == 3" class="title">活動</h2>
    </div>
  </div>
  </div>
  <div class="main row">
    <div class="col-12">
      <div class="main-content row py-lg-5">
      <div class="col-12 col-lg-6 mobile-p">
        <img v-if="singleData.photoUrl" :src="singleData.photoUrl" class="img-fluid detail">
        <img v-else src="@/assets/images/presetImage.png" class="img-fluid detail">
      </div>
      <div class="col-12 col-lg-6 py-3 px-3 detail" style="background:#FFFFFF;">
        <h2 class="focusText">{{singleData.name}}</h2>
        <img v-if="singleData.address" src="@/assets/images/icon_location.png" width="28"><label class="ms-2 mb-3" style="color:#2A48FF;">{{singleData.address}}</label>
        <div v-if="singleData.info" class="mb-3">
          <img src="@/assets/images/icon_label.svg" width="28"><label class="focusText ms-2">標籤</label><br>
          <span class="badge bg-secondary text-light text-omit" style="margin-left:35px;"> {{singleData.info}}</span>
        </div>
        <div>
          <img src="../assets/images/icon_article.svg" width="28"><label class="focusText ms-2">簡介</label><br>
          <p style="margin-left:35px;"> {{singleData.description}}</p>
        </div>
        <div class="row d-flex justify-content-around">
          <div v-if="singleData.phone" class="col-6">
            <button class="phoneButton">
            <img src="@/assets/images/icon_phone.svg" width="24" class="me-2">
            <label>{{singleData.phone}}</label>
          </button>
          </div>
          <div class="col-6">
            <button class="officialButton">
            <label>官方網站</label>
          </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import Mylove from "@/components/mylove.vue"
export default {
  components:{Mylove},
  data () {
    return {
      type:0,
      imgUrl:[
        require('@/assets/images/banner_attractions_small.png'),
        require('@/assets/images/banner_restaurant_small.png'),
        require('@/assets/images/banner_hotel_small.png'),
        require('@/assets/images/banner_activity_small.png')
      ],
      singleData:{}
    }
  },
  mounted () {
  this.singleData = this.$route.params;
  }
}
</script>

<style scoped>
.container-fluid{
  padding:0;
}
.banner{
  width: 100vw;
  height: 200px;
  background-size: cover;
  background-position: center;
}
.title-content{
  width:960px;
}
.title{
  font-size:80px;
  color:#FFFFFF;
}
.main{
  background: #F1F1F1;
}

.main-content{
  width: 1400px;
  margin: 0 auto;
}

.detail{
  border-radius: 8px;
}

.focusText{
  font-weight: bold;
}
.phoneButton{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 196px;
  height: 65px;
  border-radius: 8px;
  border-color: #B72323;
  color: #B72323;
  font-size: 20px;
}
.officialButton{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 196px;
  height: 65px;
  border-radius: 8px;
  background-color: #B72323;
  border-color: #B72323;
  color: #FFFFFF;
  font-size: 20px;
}

@media(max-width:1400px){
  .main-content{
    width:100%;
    margin:0;
  }
}

@media (max-width: 960px) {
  .mobile-img{
    width:79px;
  }
  .desktop-see{
    display:none;
  }
  .mobile-p{
    padding:0;
  }

  .phoneButton{
    width:162px;
    height:48px;
    font-size:14px;
  }

  .officialButton{
    width:162px;
    height:48px;
    font-size:14px;
  }
}
</style>

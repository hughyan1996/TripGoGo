<template>
<div>
  <div class="container-fluid">
    <div class="row banner" :style="{backgroundImage:`url(${imgUrl[type]})`}">
    <div class="col-12 pt-5">
      <div class="row mx-5">
        <div class="col-6">
          <img src="@/assets/images/icon_logo_white.png" class="mobile-img">
        </div>
        <div class="col-6 d-flex justify-content-end">
          <Mylove></Mylove>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="title-content">
      <h2 v-if="type == 0" class="title desktop-see">景點</h2>
      <h2 v-if="type == 1" class="title desktop-see">餐飲</h2>
      <h2 v-if="type == 2" class="title desktop-see">旅宿</h2>
      <h2 v-if="type == 3" class="title desktop-see">活動</h2>
      <div class="d-flex pt-4 ms-1 justify-content-between justify-content-lg-start" style="margin:0 auto;">
        <button @click="getTypePlace(0)" type="button" class="btn typeButton" :class="{'active': type == 0 }">
          <label>景點</label>
          <img v-if="type == 0" src="@/assets/images/icon_attractions_active.png" class="typeIcon mx-1">
          <img v-else src="@/assets/images/icon_attractions.png" class="typeIcon mx-1">
        </button>
        <button @click="getTypePlace(1)" type="button" class="btn typeButton ms-2" :class="{'active': type == 1 }">
          <label>餐飲</label>
          <img v-if="type == 1" src="@/assets/images/icon_restaurant_active.png" class="typeIcon mx-1">
          <img v-else src="@/assets/images/icon_restaurant.png" class="typeIcon mx-1">
        </button>
        <button @click="getTypePlace(2)" type="button" class="btn typeButton ms-2" :class="{'active': type == 2 }">
          <label>旅宿</label>
          <img v-if="type == 2" src="@/assets/images/icon_hotel_active.png" class="typeIcon mx-1">
          <img v-else src="@/assets/images/icon_hotel.png" class="typeIcon mx-1">
        </button>
        <button @click="getTypePlace(3)" type="button" class="btn typeButton ms-2" :class="{'active': type == 3 }">
          <label>活動</label>
          <img v-if="type == 3" src="@/assets/images/icon_activity_active.png" class="typeIcon mx-1">
          <img v-else src="@/assets/images/icon_activity.png" class="typeIcon mx-1">
        </button>
      </div>
      <div class="row pt-3 ms-1">
        <div class="col-12 col-lg-4 py-2">
          <select style="padding:20px; border-radius:8px; width:100%; appearance:none;" v-model="city">
            <option selected value='' disabled>選擇想去的地區</option>
            <option v-for="(item,index) in allCity" :key="index" :value="item.city">{{item.name}}</option>
          </select>
        </div>
        <div class="col-10 col-lg-4 py-2 mobile-pr">
          <input @keyup.enter="SearchPlace" type="text" placeholder="請輸入名稱(若不輸入則顯示該地區全部)" style="padding:20px; border-radius:8px; width:100%;" v-model="searchText">
        </div>
        <div class="col-2 col-lg-4 py-2 mobile-pl">
          <button @click="SearchPlace" class="searchButton">
            <img src="@/assets/images/icon_search.png" width="24" class="me-2">
            <label class="desktop-see">搜尋</label>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
  <div class="row main">
    <div class="col-12">
      <loading v-model:active="isLoading"/>
    <div v-if="isLoading==false" class="main-content row pt-5">
      <div class="col-12 col-lg-3 mb-4" v-for="(item,index) in pageData" :key="index">
        <div class="card w-100 h-100" style="position:relative;" @click="openDetail(item)">
          <div class="card-body pb-2">
            <img v-if="item.photoUrl" :src="item.photoUrl" class="card-img-top" style="height:190px">
            <img v-else src="@/assets/images/presetImage.png" class="card-img-top" style="height:190px">
            <div style="height:100px;">
              <h5 class="card-title px-2 py-2 text-omit" style="max-width: 300px;">{{item.name}}</h5>
              <div class="d-flex align-items-center">
                <img v-if="item.address" class="ms-2" src="@/assets/images/icon_location_blue.svg" width="28"><label class="card-text text-omit" style="color:#2A48FF; max-width: 280px;">{{item.address}}</label>
              </div>
            </div>
            <p v-if="item.info" class="badge bg-info text-light mx-2 text-omit" style="max-width:150px;"> {{item.info}}</p>
          </div>
          <a class="love" @click.stop="addToLove(item)">
          <img v-if="item.isLove == false" src="@/assets/images/icon_unlove.svg" width="20">
          <img v-else src="@/assets/images/icon_love.svg" width="20">
          </a>    
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': page == 0}">
              <a class="page-link" @click="getPagePlace(-1)">
              <span>&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">{{page+1}}</a></li>
            <li class="page-item">
              <a class="page-link" @click="getPagePlace(1)">
              <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios"
import Mylove from "@/components/mylove.vue"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components:{Mylove,Loading},
  data () {
    return {
      type: 0,
      city: '',
      searchText: '',
      isLoading: true,
      page: 0,
      imgUrl:[
        require('@/assets/images/banner_attractions.png'),
        require('@/assets/images/banner_restaurant.png'),
        require('@/assets/images/banner_hotel.png'),
        require('@/assets/images/banner_activity.png')
      ],
      allCity:[
                  {
                    name:'臺北市',
                    city:'Taipei'
                  },
                  {
                    name:'新北市',
                    city:'NewTaipei'
                  },
                  {
                    name:'桃園市',
                    city:'Taoyuan'
                  },
                  {
                    name:'臺中市',
                    city:'Taichung'
                  },
                  {
                    name:'臺南市',
                    city:'Tainan'
                  },
                  {
                    name:'高雄市',
                    city:'Kaohsiung'
                  },
                  {
                    name:'新竹縣',
                    city:'HsinchuCounty'
                  },
                  {
                    name:'苗栗縣',
                    city:'MiaoliCounty'
                  },
                  {
                    name:'彰化縣',
                    city:'ChanghuaCounty'
                  },
                  {
                    name:'南投縣',
                    city:'NantouCounty'
                  },
                  {
                    name:'雲林縣',
                    city:'YunlinCounty'
                  },
                  {
                    name:'嘉義縣',
                    city:'ChiayiCounty'
                  },
                  {
                    name:'屏東縣',
                    city:'PingtungCounty'
                  },
                  {
                    name:'宜蘭縣',
                    city:'YilanCounty'
                  },
                  {
                    name:'花蓮縣',
                    city:'HualienCounty'
                  },
                  {
                    name:'台東縣',
                    city:'TaitungCounty'
                  },
                  {
                    name:'澎湖縣',
                    city:'PenghuCounty'
                  },
                  {
                    name:'金門縣',
                    city:'KinmenCounty'
                  },
                  {
                    name:'連江縣',
                    city:'LienchiangCounty'
                  },
                  {
                    name:'基隆市',
                    city:'Keelung'
                  },
                  {
                    name:'新竹市',
                    city:'Hsinchu'
                  },
                  {
                    name:'嘉義市',
                    city:'Chiayi'
                  }
                ],
      allData: [],
      pageData:[]
    }
  },
  mounted () {
    this.getPlace();
  },
  computed: {
    APIurl () {
      if(this.type == 0){
        return 'ScenicSpot';
      }
      else if(this.type == 1){
        return 'Restaurant';
      }else if(this.type == 2){
        return 'Hotel';
      }else if(this.type == 3){
        return 'Activity';
      }
    },
    myLove () {
      return this.$store.state.myLove;
    }
  },
  methods: {
    getPlace () {
      this.isLoading = true;
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.APIurl}`).then(res=>{
        const result = res.data;
        const newData = result.map(item => {
          const id = item.ScenicSpotID || item.RestaurantID || item.HotelID || item.ActivityID;
          const isLove = this.myLove.find(res => res.id === id) !== undefined
          return{
            id: id,
            photoUrl: item.Picture.PictureUrl1,
            name: item.ScenicSpotName || item.RestaurantName || item.HotelName || item.ActivityName,
            address: item.Address,
            info: item.TicketInfo || item.Class || item.Class1,
            description: item.Description,
            phone: item.Phone, 
            isLove: isLove
          }
      })
        this.allData = newData;
        this.page = 0;
        this.getPagePlace(0);
        this.isLoading = false;
      })
      .catch(() =>{
        alert('發生例外錯誤!')
        this.isLoading = false;
      });
    },
    getTypePlace (item) {
      this.city = '';
      this.searchText = '';
      this.type = item;
      this.getPlace();
    },
    SearchPlace (){
      if(this.searchText.replace(/(^\s*)|(\s*$)/g, "").length ==0 && this.searchText != ''){alert('請勿輸入空白!'); return;}
      this.isLoading = true;
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.APIurl}/${this.city}`).then(res => {
        const result = res.data;
        let newData = result.map(item => {
          const id = item.ScenicSpotID || item.RestaurantID || item.HotelID || item.ActivityID;
          const isLove = this.myLove.find(res => res.id === id) !== undefined
          return{
            id: item.ScenicSpotID,
            photoUrl: item.Picture.PictureUrl1,
            name: item.ScenicSpotName || item.RestaurantName || item.HotelName || item.ActivityName,
            address: item.Address,
            info: item.TicketInfo || item.Class || item.Class1,
            description: item.Description,
            phone: item.Phone,
            isLove: isLove
          }
        })
        newData = newData.filter(res => res.name.indexOf(this.searchText) >= 0);
        this.allData = newData;
        this.page = 0;
        this.getPagePlace(0);
        this.isLoading = false;
      })
        .catch(() =>{
        alert('發生例外錯誤!')
        this.isLoading = false;
      });
    },
    getPagePlace(item){
      document.documentElement.scrollTop = 0;
      this.isLoading = true;
      this.page = this.page + item;
      let firstPlace = (this.page) * 24
      this.pageData = this.allData.slice(firstPlace,firstPlace + 24);
      this.isLoading = false;
    },
    openDetail(item){
      let type = this.type
      this.$router.push({
        name:'detail',
        params:{...item,type}
      })
    },
    addToLove(item){
      this.$store.commit('setMyLove',item);
      localStorage.setItem('myLove',JSON.stringify(this.$store.state.myLove));
      item.isLove = !item.isLove;
    }
  }
}
</script>

<style scoped>
.container-fluid{
  padding:0;
}
.banner{
  width: 100vw;
  background-size: cover;
  background-position: center;
}

.title-content{
  width:1400px;
  margin:80px auto;
}
.title{
  font-size:80px;
  color:#FFFFFF;
}

.typeButton{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 48px;
  border-radius: 24px;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.typeButton.active{
  color:#FFFFFF;
  background-color: #B72323;
  border-color: #B72323;
}

.typeIcon{
  width:20px
}

.searchButton{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 65px;
  border-radius: 8px;
  background-color: #B72323;
  border-color: #B72323;
  color: #FFFFFF;
  font-size: 20px;
}

.main{
  background: #F1F1F1;
  width:100vw
}

.main-content{
  width: 1400px;
  margin: 0 auto;
}

.card{
  border-radius: 12px;
}

.card-body{
  padding:0 ;
}

.text-omit{
  overflow : hidden; 
  text-overflow : ellipsis; 
  white-space : nowrap; 
}

.love{
  background:#FFFFFF;
  width:32px;
  height:32px;
  border-radius: 50%;
  position:absolute;
  top:10px;
  right:10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media(max-width:1400px){

  .title-content{
    width:100%;
    margin:0;
}
  .main-content{
    width:100%;
    margin:0;
}
}

@media (max-width: 960px) {
  .desktop-see{
    display:none;
  }
  .mobile-img{
    width:79px;
  } 
  .typeButton{
    width: 90px;
    height: 45px;
  }
  .typeIcon{
    width:14px;
  }
  .searchButton{
    width: 100%;
  }
  .mobile-pr{
    padding-right:0;
  }

  .mobile-pl{
    padding-left:0;
  }
}
</style>

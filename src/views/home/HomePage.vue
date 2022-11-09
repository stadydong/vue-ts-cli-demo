<template>
  <div class="homepage">
    <el-row :gutter="30">
      <el-col :lg="6" :sm="8" :xs="12">
        <el-card class="cart">
          <el-row justify="space-around">
            <img src="http://localhost:3000/icon/home_shopping.png" alt="" class="image">
            <div class="cart_content">
              <div class="cart_name">cartName</div>
              <div class="cart_number">Number</div>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="6" :sm="8" :xs="12">
        <el-card class="cart">
          <el-row justify="space-around">
            <img src="http://localhost:3000/icon/home_shopping.png" alt="" class="image">
            <div class="cart_content">
              <div class="cart_name">cartName</div>
              <div class="cart_number">Number</div>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="6" :sm="8" :xs="12">
        <el-card class="cart">
          <el-row justify="space-around">
            <img src="http://localhost:3000/icon/home_shopping.png" alt="" class="image">
            <div class="cart_content">
              <div class="cart_name">cartName</div>
              <div class="cart_number">Number</div>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="6" :sm="8" :xs="12">
        <el-card class="cart">
          <el-row justify="space-around">
            <img src="http://localhost:3000/icon/home_shopping.png" alt="" class="image">
            <div class="cart_content">
              <div class="cart_name">cartName</div>
              <div class="cart_number">Number</div>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24">
        <div ref="weekly_report" class="weekly_report"/>

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
  import echarts from '@/global/echarts'
  import { onMounted, ref } from 'vue';
  import { debounce } from '@/utils/debounce'
  let weekly_report = ref<HTMLElement>()

  onMounted(()=>{
    const echart = echarts.init(weekly_report.value as HTMLElement)
    const Home_option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads']
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '2%',
    top:"15%",
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
  ]
    };
    echart.setOption(Home_option)
    // setInterval(()=>{
    //   echart.resize()
    // },3000)
    const res = debounce(function(){
      echart.resize()
    },100,this)
    window.addEventListener("resize",(e)=>{   
      res()
    })
  })
  
</script>

<style lang='less' scoped>
.homepage{
  background-color: #f2f7ff;
  padding: 32px;
  height: 100%;
  .cart{
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    :deep(.el-card__body){
      padding-left: 0;
    }
    .cart_content{
      .cart_number{
        font-weight: 700;
      }
      .cart_number{
        padding-top: 4px;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .image{
    display: block;
    width: 40px;
    height: 40px;
  }
  .weekly_report{
    margin-top: 20px;
    width: 100%;
    height: 250px;
    background-color: #fff;
  }
}
</style>
<!--免责文案-->
<template>
  <div id="Content" class="contentView" v-if="this.$store.state.IsDisclaiDisplay">
    <div class="contentBox">
      <div class="Disclaimer">
        <div class="title">自助值房机使用须知</div>
        <div class="contentText">
          <p>&#12288;&#12288;本设备之前，请您仔细阅读，点击同意则视为理解并遵行本服务如下条款，如不同意则请亲自前往酒店前台办理相关业务。</p>
          <h4>一、服务简介</h4>
          <p>&#12288;&#12288;因技术原因，此设备仅限持有中华人民共和国居民身份证（除港、澳、台外）的合法居民办理所在酒店的订房、付费、取卡、续费、退房业务，符合条件的住客可通过本自助值房机完成上述业务办理手续</p>
          <h4>二、住客承诺</h4>
          <p>1、住客确认：本服务条款是处理双方权利义务的约定依据，在办理酒店入住及退房等相关手续时，住客也同时承认了其拥有缔结本服务条款的权利能力和行为能力，并且对其在本自助值房机操作中提供的所有信息的真实性负责。</p>
          <p>2、根据公安机关实名登记入住规定及《反恐法》要求，住宿人数必须与登记人数一致，同行人必须办理身份登记（按操作提示），如住客有任何违规行为，而由此造成的一切责任与后果由住客个人承担。</p>
          <p>3、住客应遵守相关法律法规的规定，不得在酒店内进行违法行为，否则，一经发现，将交由公安机关处理，并由住客承担一切法律后果。</p>
          <p>4、住客使用本设备所交付的包含但不限于房金、押金、及消费品金额，如后续对金额有异议应于本设备所服务酒店进行协商处理。</p>
          <h4>三、入住注意事项 </h4>
          <p>1、若住客有亲友来访，不可在酒店停留超过当日24时。</p>
          <p>2、退房时间依据本酒店退房时间为准，超时需根据酒店具体收费情况加收费用。</p>
          <p>3、请住客妥善保管好随行的贵重物品，如有丢失酒店概不负责。 </p>
          <p>4、客房内如有消费品，请住客注意相应的价格标注，若有消费，请退房后按标价在“途易科技”公众号内结算（具体位置，公众号——我的订单——酒店订单——详细订单），结算后客房押金将退还。</p>
          <p>5、住客如需住店发票，请到酒店前台办理。</p>
          <h4>四、服务条款的修改</h4>
          <p>在法律法规允许的范围内，本服务条款可能将不定期进行修改，一旦条款及服务内容产生变动，自助值房机将在您下一次使用时提示您重新签署。</p>
          <h4>五、不可抗力</h4>
          <p>对因不可抗力或其他无法控制的原因（如自助值房机服务系统异常或无法使用）导致住客无法通过自助值房机办理订房、付费、取卡、续费和退房手续的，住客应到酒店前台说明情况，办理后续相关手续。</p>
          <h4>六、终止服务</h4>
          <p>下列情况可终止本自助值房机服务：</p>
          <p>1、住客违反法律法规及本服务条款相关内容规定使用自助值房机；</p>
          <p>2、住客利用自助值房机实施违法违规行为或侵害第三人权益的；</p>
          <p>3、住客提供的订单信息不存在或无效；</p>
          <p>4、本服务条款更新时，住客明示不愿接受新的条款；</p>
          <p>5、酒店或设备提供方认为需要终止服务的其他情况。</p>
          <p>如因本条1、2导致终止服务的，酒店或设备提供方同时保留对住客违法行为追究法律责任的权利。</p>
          <h4>七、生效要件及法律适用</h4>
          <p>1、本服务条款自住客点击同意 即发生法律约束力；</p>
          <p>2、本服务最终解释权归海南途易科技股份有限公司所有，本服务条款的订立、执行和解释及争议的解决均适用中国法律；</p>
          <p>3、如本服务条款中的任何条款被裁定为无效或不可执行，不影响其余条款的继续有效；</p>
          <p>4、如就本服务条款内容或其执行发生任何争议，双方应尽量友好协商解决，协商不成时，任何一方均可向酒店所在地有管辖权的法院提起诉讼。</p>
        </div>
      </div>
      <div class="bottomBtn">
        <el-button type="warning" plain v-on:click="disAgreet()">不同意</el-button>
        <el-button type="warning" v-on:click="agreet()">同意并继续</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"

Vue.use(Button)

export default {
  name: 'Content',
  data () {
    return {
      // isDispaly:false,
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏下一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    agreet(){
      this.VueAxios(this.ServeApi.testApi,{type:1})
      .then(res => {
        console.log(res)
      })
      this.$store.commit("changeDisclai", false);//隐藏免责
      this.$store.commit("changeStatus", false);//展示上一步
    },
    disAgreet(){
      this.$router.push('/index');
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { }
}
</script>

<style lang="less">

#Content {
  color: #F9FCFC;
  z-index: 1;
  padding:0 190px;
  .contentBox{
    height:560px;
    background: rgba(67,67,67,0.5);
    border-radius: 0 0 10px 10px;
    position: relative;
  }
  .Disclaimer{
    position:absolute;
    width: 100%;
    text-align: center;
    margin: 22px 0 0 0;
    font-size:30px;
  }
  .contentText{
    font-size: 12px;
    height: 414px;
    overflow-y: auto;
    position: absolute;
    top: 50px;
    padding: 0 36px;
    text-align: left;
  }
  .bottomBtn{
    position: absolute;
    bottom: 26px;
    width:100%;
    .el-button--warning{
      color: #012625;
      font-size: 18px;
    }
    .el-button--warning.is-plain{
      width: 132px;
      height: 43.6px;
      margin-left: 109px;
    }
    button:last-child{
      position:absolute;
      right:109px;
    }
  }
}
.Dispaly{
  display: none;
}
</style>

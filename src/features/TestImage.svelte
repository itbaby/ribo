<script lang="ts">
    import automotiveImg from "../assets/automotive-new.jpg";
    import internetImg from "../assets/internet.jpg";
    import financeImg from "../assets/finance.jpg";
    import communicationImg from "../assets/communication.jpg";
    import ecommerceImg from "../assets/ecommerce-new.jpg";
    import newenergyImg from "../assets/newenergy-pro.jpg";
    import semiconductorImg from "../assets/semiconductor-pro.jpg";

    console.log("Automotive image:", automotiveImg);
    console.log("Internet image:", internetImg);
    console.log("Finance image:", financeImg);
    console.log("Communication image:", communicationImg);
    console.log("Ecommerce image:", ecommerceImg);
    console.log("New energy image:", newenergyImg);
    console.log("Semiconductor image:", semiconductorImg);
</script>

<div>
    <h1>Test Images</h1>
    <img src={automotiveImg} alt="Automotive" style="width: 200px; height: auto;" />
    <img src={internetImg} alt="Internet" style="width: 200px; height: auto;" />
    <img src={financeImg} alt="Finance" style="width: 200px; height: auto;" />
    <img src={communicationImg} alt="Communication" style="width: 200px; height: auto;" />
    <img src={ecommerceImg} alt="Ecommerce" style="width: 200px; height: auto;" />
    <img src={newenergyImg} alt="New Energy" style="width: 200px; height: auto;" />
    <img src={semiconductorImg} alt="Semiconductor" style="width: 200px; height: auto;" />
</div>
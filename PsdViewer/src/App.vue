<template>
  <div class="container">
    <div id="dropzone">
      <p>Drop here</p>
    </div>
    <div id="content">
      <div ref="imageRef" id="image"></div>
      <pre ref="dataRef" id="data"></pre>
    </div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import PSD from '@n.see/psd-parser';

const dataRef = ref();
const imageRef = ref();

function handleFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  PSD.fromURL(url).then((psd) => {
    console.log('psd==========', psd);
    const data = psd.tree().export();
    const dataString = JSON.stringify(data, undefined, 2);
    if (dataRef.value) {
      dataRef.value.innerHTML = dataString;
    }
    for (const layer of psd.layers) {
      if (layer.height !== 0 && layer.width !== 0) {
        imageRef.value.appendChild(layer.image.toPng());
      }
    }

    const node = psd.tree();
    console.log('node', node);
  });
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
#data {
  background-color: #eee;
  padding: 10px;
  margin: 0;
  flex: 1;
}

#dropzone {
  width: 500px;
  height: 100px;
  border: 1px #ababab dashed;
  margin: 50px auto;
}

#dropzone p {
  text-align: center;
  line-height: 100px;
  margin: 0;
  padding: 0;
  background-color: #eee;
}

#content {
  display: flex;
}
</style>

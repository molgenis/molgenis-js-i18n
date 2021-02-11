<template>
  <div class="container">
    <h1>Hello i18n</h1>

    <div class="row pt-3">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">key</th>
              <th scope="col">value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hallo_label</td>
              <td>{{ "hallo_label" | i18n }}</td>
            </tr>
            <tr>
              <td>good_by_label</td>
              <td>{{ "good_by_label" | i18n }}</td>
            </tr>
            <tr>
              <td>turtle_label</td>
              <td>{{ "other:turtle_label" | i18n }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Demo"
})
</script>

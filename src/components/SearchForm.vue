<script setup>
import WelcomeItem from './WelcomeItem.vue'
import axios from 'axios'
</script>

<template>
  <WelcomeItem>
    <template #heading>Search eligible stands by cadastral number</template>
    <template #searchForm>
      <input v-model="cadastral" type="text" placeholder="Cadastral number" />
      <button @click="search">Search</button>
      <div>{{ message }}</div>
      <div v-if="response.length!==0 && response.data.totalCount>0" class="table-wrapper">
        <table class="fl-table">
          <thead>
            <tr>
              <th>Eligibility</th>
              <th>Id</th>
              <th>Stand number</th>
              <th>Value class</th>
              <th>Average age</th>
              <th>Logging age</th>
              <th>Area</th>
              <th>Average diameter</th>
              <th>Average height</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stand in response.data.stands">
              <td :class="{ eligible: stand.yearsToLogging <= 0 }">{{ stand.eligibility }}</td>
              <td>{{ stand.id }}</td>
              <td>{{ stand.standNbr }}</td>
              <td>{{ stand.bonityCode }}</td>
              <td>{{ stand.age }} years</td>
              <td>{{ stand.loggingAge }} years</td>
              <td>{{ stand.area }} ha</td>
              <td>{{ stand.diameter }} cm</td>
              <td>{{ stand.height }} m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

  </WelcomeItem>
</template>

<script>
export default {
  data() {
    return {
      response: [],
      message: "",
      count: 0
    }
  },
  methods: {
    async search() {
      this.response = []
      if(!this.cadastral) {
        this.message = "Cadastral number not provided"
      } else {
        this.message = "Fetching data from Forest registry..."
        this.response = await axios.get('http://localhost:8000/stands/' + this.cadastral)
        this.message = this.response.data.totalCount > 0 
          ? "Found " + this.response.data.totalCount + " stands, including " + this.response.data.eligibleNow + " stands eligible now" 
          : "No eligible stands found"
      }
    }
  }
}
</script>

<style scoped>

/* Table Styles */

.table-wrapper{
    margin: 10px 0px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.eligible {
    color: hsla(160, 100%, 37%, 1);
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: hsla(160, 100%, 37%, 1);
}

/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}
</style>
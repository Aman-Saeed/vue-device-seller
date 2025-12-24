<template>
  <div class="container">
    <div class="pt-5">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Devices</h3>
            </div>
            <div class="col-6 text-end">
              <button
                class="btn btn-primary"
                type="button"
                @click="createDeviceRequest"
              >
                Add New Device
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Device Name</th>
                <th scope="col">Price</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(device, ind) in deviceList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ device.name }}</td>
                <td>{{ "$" + device.price }}</td>
                <td>{{ device.deviceType }}</td>
                <td>{{ new Date(device.createTime).toLocaleDateString() }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary">Edit</button>
                  <button class="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <DeviceModal ref="deviceModal" />
</template>

<script>
import DeviceService from "@/services/device.service";
import DeviceModal from "@/components/Device.vue";

export default {
  name: "admin-page",
  components: {
    DeviceModal,
  },
  data() {
    return {
      deviceList: [],
    };
  },
  mounted() {
    DeviceService.getAllDevices()
      .then((response) => {
        this.deviceList = response.data;
      })
      .catch((error) => {
        console.error("There was an error fetching the devices:", error);
      });
  },
  methods: {
    createDeviceRequest() {
      this.$refs["deviceModal"].showDeviceModal();
    },
  },
};
</script>

<style scoped></style>

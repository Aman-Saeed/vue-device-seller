<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>

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
          <table id="allDevicesTable" class="table table-striped">
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
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="editDeviceRequest(device)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteDeviceRequest(device, ind)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <DeviceModal
    ref="deviceModal"
    :selected-device="selectedDevice"
    @saved="deviceSaved"
  />
</template>

<script>
import DeviceService from "@/services/device.service";
import DeviceModal from "@/components/Device.vue";
import Device from "@/models/device";
import { nextTick } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "admin-page",
  components: {
    DeviceModal,
  },
  data() {
    return {
      deviceList: [],
      selectedDevice: new Device(),
      errorMessage: null,
    };
  },
  mounted() {
    DeviceService.getAllDevices()
      .then((response) => {
        console.debug("getAllDevices response:", response);
        // Support several response shapes: array, paged { content: [] }, named field etc.
        let list = [];
        if (Array.isArray(response.data)) {
          list = response.data;
        } else if (response.data && Array.isArray(response.data.content)) {
          list = response.data.content;
        } else if (response.data && Array.isArray(response.data.devices)) {
          list = response.data.devices;
        } else if (response.data && typeof response.data === "object") {
          const arr = Object.values(response.data).find((v) =>
            Array.isArray(v)
          );
          if (arr) list = arr;
        }
        this.deviceList = list;
      })
      .catch((error) => {
        console.error("There was an error fetching the devices:", error);
      });
  },
  methods: {
    createDeviceRequest() {
      this.selectedDevice = new Device();

      const modalComp = this.$refs && this.$refs.deviceModal;
      if (modalComp && typeof modalComp.showDeviceModal === "function") {
        modalComp.showDeviceModal();
        return;
      }

      const modalEl = document.getElementById("deviceModal");
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.show();
      } else {
        console.warn(
          "Unable to show device modal: ref and DOM element not found"
        );
      }
    },
    deviceSaved(device) {
      const itemIndex = this.deviceList.findIndex(
        (item) => item.id === device.id
      );
      if (itemIndex !== -1) {
        this.deviceList[itemIndex] = device;
      } else {
        this.deviceList.push(device);
      }
    },
    editDeviceRequest(device) {
      this.selectedDevice = Object.assign({}, device);
      nextTick().then(() => {
        const modalComp = this.$refs && this.$refs.deviceModal;
        if (modalComp && typeof modalComp.showDeviceModal === "function") {
          modalComp.showDeviceModal();
          return;
        }

        const modalEl = document.getElementById("deviceModal");
        if (modalEl) {
          const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
          modal.show();
        } else {
          console.warn(
            "Unable to show device modal: ref and DOM element not found"
          );
        }
      });
    },
    deleteDeviceRequest(device, ind) {
      DeviceService.deleteDevice(device)
        .then(() => {
          this.deviceList.splice(ind, 1);
        })
        .catch((err) => {
          this.errorMessage = "Error deleting device.";
          console.error("Error deleting device:", err);
        });
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="modal fade" ref="deleteModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          Are you sure to delete the selected device?
        </div>

        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button class="btn btn-danger" type="button" @click="deleteDevice">
            I'm sure!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "device-delete-modal",
  methods: {
    showDeleteModal() {
      const modalEl = this.$refs.deleteModal;
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.show();
      } else {
        console.warn("delete modal element not found");
      }
    },
    deleteDevice() {
      this.$emit("confirmed");
      const modalEl = this.$refs.deleteModal;
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();
      }
    },
  },
};
</script>

<style scoped></style>

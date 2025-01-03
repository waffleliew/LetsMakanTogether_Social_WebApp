<template>
  <n-space class="group" v-if="group" item-style="display: flex;" justify="space-evenly">
    <n-card size="huge" content-style="width: 1000px; justify-content: center;">
      <n-space justify="space-around" align="center">
        <n-grid :cols="10">
          <n-gi span="8">
            <n-h2 class="title">{{ group.GroupName }}</n-h2>
          </n-gi>
          <n-gi>
            <n-space class="group-count-wrapper" align="center" style="margin-top: 5px">
              <n-icon :component="User" class="shift-icon" size="20"/>
              <n-text class="group-count">{{ memberCount }}</n-text>
            </n-space>
          </n-gi>
          <n-gi>
            <n-button v-show="!isGroupOwner" strong round type="error" circle @click="handleConfirmLeave" color="#F7F4EF" style="width:100px">
              Leave
            </n-button>
            <n-button v-show="isGroupOwner" strong round type="error" circle @click="handleConfirmDelete"  style="width:100px">
              Delete
            </n-button>
          </n-gi>
        </n-grid>
      </n-space>
      <n-tabs justify-content="space-evenly" type="line">
        <n-tab-pane name="detail" tab="Group Details">
          <GroupDetail :group-id="group.GroupID"/>
        </n-tab-pane>
        <n-tab-pane name="chat" tab="Group Chat">
          <GroupChat :group-id="group.GroupID"/>
        </n-tab-pane>
        <n-tab-pane name="meeting" tab="Next Meeting">
          <Meeting :group-id="group.GroupID"/>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

<script>
import { User } from "@vicons/fa";
import { useDialog, useMessage } from 'naive-ui';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index.js';
import GroupChat from './groupchat.vue';
import GroupDetail from './groupdetail.vue';
import Meeting from './nextmeeting.vue';


export default {
  computed: {
    User() {
      return User
    }
  },
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Meeting,
    GroupChat,
    GroupDetail
  },
  emits: ['group-updated'],
  setup(props, { emit }) {
    const context = { emit };
    const message = useMessage()
    const dialog = useDialog()
    const group = ref({});
    const isGroupOwner = ref(false);
    const router = useRouter();
    const userDetails = ref({});
    const memberCount = ref({});

    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        memberCount.value = group.value.memberCount.count;
        userDetails.value = await store.dispatch("user/getUserDetails");
        if (userDetails.value.UserID === group.value.OwnerID) {
          isGroupOwner.value = true;
        }
        return group.value;

      }
    };

    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        await getGroupDetails(newVal);
      }
    }, {immediate: true});

    onMounted(async() => {
      await getGroupDetails(props.groupId);
    })

    //leave group
    async function handleLeaveButtonClick() {
      store.dispatch("group/leaveGroup", group.value.GroupID).then(
          () => {
            router.push("/mygroups");
            message.success("Leave Success");
            context.emit('group-updated');
          })
          .catch((err) => {
                message.error(err.message);
                message.error('Leave fail');
              }
          );
      }
    //delete group
    async function handleDeleteButtonClick() {
      store.dispatch("group/deleteGroup",group.value.GroupID).then(
          () => {
            router.push("/mygroups");
            message.success("Delete Success");
            context.emit('group-updated');
          })
          .catch((err) => {
                message.error(err.message);
                message.error('Delete fail');
              }
          );
    }

    return {
      group,
      memberCount,
      Meeting,
      GroupChat,
      GroupDetail,
      isGroupOwner,
      handleConfirmLeave () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure you want to leave the group?',
          positiveText: 'LEAVE GROUP',
          negativeText: 'CANCEL',
          onPositiveClick: () => {
            handleLeaveButtonClick()
          },
          onNegativeClick: () => {
          }
        })
      },
      handleConfirmDelete () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure you want to delete and leave the group?',
          positiveText: 'DELETE GROUP',
          negativeText: 'CANCEL',
          onPositiveClick: () => {
            handleDeleteButtonClick()
          },
          onNegativeClick: () => {
          }
        })
      }
    };
  },
};
</script>

<style scoped>


</style>
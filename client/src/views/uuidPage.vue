<template>
    <appLayout title="uuidPage">
        <div class="container mx-auto">
            <headerComponent title="UUID Generator" description="Generate a unique UUID identifier" />

            <div class="flex place-content-center text-white">
                <div class="text-2xl self-center pr-3">Version: </div>
                <div class="flex border border-borders rounded-full p-2 space-x-2">
                    <span @click="this.version=1" class="rounded-full px-2 py-1" :class="this.version === 1 ? 'bg-accent' : ''">v1</span>
                    <span @click="this.version=3" class="rounded-full px-2 py-1" :class="this.version === 3 ? 'bg-accent' : ''">v3</span>
                    <span @click="this.version=4" class="rounded-full px-2 py-1" :class="this.version === 4 ? 'bg-accent' : ''">v4</span>
                    <span @click="this.version=5" class="rounded-full px-2 py-1" :class="this.version === 5 ? 'bg-accent' : ''">v5</span>
                </div>
            </div>

            <div class="flex place-content-center pt-5 mx-auto">
                <div class="flex flex-col space-y-3 w-full md:w-2/3">
                    
                    <div v-if="advanced" class="flex flex-col space-y-3">
                        <div class="flex place-content-between text-white">
                            <span class="text-muted">NameSpace</span> 
                            <span @click="generateNameSpace" class="text-right text-accent">Generate Random NameSpace</span> 
                        </div>

                        <div class="border border-borders p-3 rounded-md">
                            <input type="text" v-model="nameSpace" class="text-white text-xl rounded-md w-full border-none bg-background" placeholder="(XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)"/>
                        </div>

                        <span class="text-muted">Name</span>
                        <div class="border border-borders p-3 rounded-md">
                            <input type="text" v-model="name" class="text-white text-xl rounded-md w-full border-none bg-background" placeholder="Any Name Here"/>
                        </div>
                    </div>

                    <span class="text-muted">UUID</span>
                    <div class="flex flex-col md:flex-row">
                        <span class="border border-borders p-3 rounded-md w-full">
                            <input type="text" v-model="uuid" class="text-white text-xl rounded-md w-full border-none bg-background" readonly/>
                        </span>
                        <button @click="generateUUID" class="border border-accent text-xl text-white px-2 py-1 rounded-md mt-5 md:mt-0 md:ml-3 w-full md:w-1/3">Generate New</button>
                    </div>
                </div>
            </div>

            <cardComponent title="UUID Information" description="A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems, ensuring that identifiers are globally unique." class="mt-5 w-full md:w-2/3">
                <div class="text-muted space-y-3">
                    <p><span class="font-bold text-white">Version 1</span> is useful when you need a timestamp in the UUID and have a network card (for a MAC address).</p>
                    <p><span class="font-bold text-white">Version 3</span> is useful when creating consistent UUIDs for the same input name and namespace.</p>
                    <p><span class="font-bold text-white">Version 4 </span> UUIDs are widely used for their simplicity and do not require any state to be stored.</p>
                    <p>If you're unsure which of the UUID versions you should use, choose version 4. Version 4 UUID is the most common and random enough to almost completely avoid duplicates. Also, version 4 UUIDs are standard in applications requiring random unique identifiers working across different systems.</p>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>


<script>
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export default {
    name: 'uuidPage',
    data() {
        return {
            version: 1,
            uuid: '',
            nameSpace: '',
            name: '',
        };
    },

    computed: {
        advanced() { return this.version === 3 || this.version === 5;},
    },

    mounted() {
        this.generateUUID();
    },

    watch: {
        version() {
            this.name = '';
            this.nameSpace = '';

            if(this.version === 1 || this.version === 4) {
                this.generateUUID();
            } else {
                this.uuid = '';
            }
        }
    },


    methods: {
        generateUUID() {
            this.errorMessage = '';
            switch (this.version) {
                case 1:
                    this.uuid = uuidv1();
                    break;
                case 3:
                    if(!this.nameSpace || !this.name ) return push.error(`Please enter a NameSpace and Name.`)
                    this.uuid = uuidv3(this.name, this.nameSpace);
                    break;
                case 4:
                    this.uuid = uuidv4();
                    break;
                case 5:
                    if(!this.nameSpace || !this.name ) return push.error(`Please enter a NameSpace and Name.`)
                    this.uuid = uuidv5(this.name, this.nameSpace);
                    break;
            }
        },

        generateNameSpace() {
            this.nameSpace = uuidv4();
        }
    },
}
</script>

<style scoped>
 [type='text']:focus {
    outline: none;
    box-shadow: none;
 }
</style>
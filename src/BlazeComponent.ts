import React from 'react';
import BlazeObserver from './core/BlazeObserver';
export default abstract class BlazeComponent<P, S> extends React.Component<P, S>{
    $data:S
    constructor(props: P) {
        super(props)
        this.$data=this.data();
        let _this=this;
        //this.$data=this.createObs(this.data());
        this.$data=BlazeObserver.createObs(this.data(),this.setPrivateState);
        this.state = this.$data;
    }

    private setPrivateState=()=>{
        this.setState(this.$data);
    }
    
    abstract data(): S;

    model(_key:string){
        let model:any={
            key:_key,
            obj:this.$data
        }
        return model;
    }
}
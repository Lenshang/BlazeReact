import React from 'react';

export default abstract class BlazeComponent<P, S> extends React.Component<P, S>{
    $data:S
    constructor(props: P) {
        super(props)
        this.$data=this.data();
        let _this=this;
        this.$data=this.createObs(this.data());
        this.state = this.$data;
    }

    private setPrivateState=()=>{
        let getObj=(obj:any):any=>{
            let r:any={};
            for(var key in obj){
                if(key.indexOf("o_")<0){
                    continue
                }
                if(typeof(obj[key])==="object"){
                    r[key.substr(2)] = getObj(obj[key]);
                }
                else{
                    r[key.substr(2)] = obj[key];
                }
            }
            return r;
        }
        let r=getObj(this.$data);
        this.setState(r);
    }

    private createObs=(obj:any)=>{
        let _this=this;
        let result:any={};
        if(typeof(obj)==="object"){
            for(var skey in obj){
                if(typeof(obj[skey])=="object"){
                    result["o_"+skey]=this.createObs(obj[skey]);
                }
                else{
                    result["o_"+skey]=obj[skey];
                }
                (function(key){
                    Object.defineProperty(result,key,{
                        set:function(val){
                            let _val=_this.createObs(val);
                            result["o_"+key]=_val;
                            let newObj=new Object();
                            Object.defineProperty(newObj, key, {
                                configurable: false,
                                writable: true,
                                enumerable: true,
                                value: _val
                            })
                            _this.setPrivateState();
                        },
                        get:function(){
                            return result["o_"+key];
                        }
                    });
                })(skey);
            }
            return result;
        }
        return obj;
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
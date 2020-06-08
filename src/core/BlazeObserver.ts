export default class BlazeObserver{
    static preOriginName:string="$o_";
    static createObs(obj:any,onWatch:Function){
        if(Array.isArray(obj)){
            let _this=this;

            for(var index in obj){
                obj[index]=this.createObs(obj[index],onWatch);
            }
            let result=new Proxy(obj,{
                get:function(target, name:number){
                    return target[name];
                },
                set:function(target,name:number,val){
                    let _old=target[name];
                    if(val==_old){
                        return true;
                    }
                    target[name]=_this.createObs(val,onWatch);
                    onWatch(_old,val);
                    return true;
                }
            });
            return result;
        }
        else if(typeof(obj)==="object"){
            let result:any={
            };
            for(var key in obj){
                result[this.preOriginName+key]=this.createObs(obj[key],onWatch);
                this.createGetSet(result,key,onWatch);
            }
            return result
        }
        else{
            return obj;
        }
    }

    private static createGetSet(result:Object,key:any,onWatch:Function){
        let _this=this;
        (function(skey:any){
            Object.defineProperty(result,skey,{
                set:function(val:any){
                    let _old=this[_this.preOriginName+skey];
                    let _val=_this.createObs(val,onWatch);
                    this[_this.preOriginName+skey]=_val;
                    onWatch&&onWatch(_old,_val);
                },
                get:function(){
                    return this[_this.preOriginName+skey];
                }
            } as any)
        })(key);
    }
}
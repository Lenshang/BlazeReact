import React, { FunctionComponent, ComponentClass } from 'react';

export const useBlaze = (WrappedComponent:string | FunctionComponent<any> | ComponentClass<any, any>) => {
    return class extends React.Component {
        constructor(props:any) {
            super(props);
        }

        _getItemByKey(key:string){
            return eval(`this.props.model.obj.${key}`);
        }

        _setItemByKey(key:string,value:string){
            eval(`this.props.model.obj.${key}=value`);
        }

        onChange(e:any){
            this._setItemByKey((this.props as any).model.key,e.target.value);

            if((this.props as any).onChange){
                (this.props as any).onChange(e);
            }
        }

        getVal(){
            return this._getItemByKey((this.props as any).model.key);
        }

        render() {
            return React.createElement(WrappedComponent, {onChange: (e:any)=>{this.onChange(e);} ,value:this.getVal() , ...this.props}, this.props.children);
        }
    }
}
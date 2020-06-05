import React from 'react';

export const useBlaze = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        _getItemByKey(key){
            return eval(`this.props.model.obj.${key}`);
        }

        _setItemByKey(key,value){
            eval(`this.props.model.obj.${key}=value`);
        }

        onChange(e){
            this._setItemByKey(this.props.model.key,e.target.value);
        }

        getVal(){
            return this._getItemByKey(this.props.model.key);
        }

        render() {
            return <WrappedComponent onChange={e=>{this.onChange(e);}} value={this.getVal()} {...this.props}></WrappedComponent>
        }
    }
}
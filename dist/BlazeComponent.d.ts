import React from 'react';
export default abstract class BlazeComponent<P, S> extends React.Component<P, S> {
    $data: S;
    constructor(props: P);
    private setPrivateState;
    private createObs;
    abstract data(): S;
    model(_key: string): any;
}

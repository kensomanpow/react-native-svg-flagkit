import React, { Component } from 'react';
import {  Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const getFlagObjectByCode = (code) => {
    return flagSvgs.find(flagSvg => flagSvg.code === code)
}

export const getFlagSvgComponentByCode = (code) => {
    return getFlagObjectByCode(code).component
}

export const getFlagByDollarCode = (dollarCode) => {
    let code = dollarCode.slice(0, 2)
    if (dollarCode === 'ANG') {
        code = 'NL'
    }
    const flagObject = getFlagObjectByCode(code)
    if (flagObject) {
        const flag = flagObject.component ? flagObject.component : flagObject.img
        return flag
    }
    return null
}

export default class Flag extends Component {
    static propTypes = {
        id: PropTypes.string,
        size: PropTypes.number,

        width: PropTypes.number,
        height: PropTypes.number,

        onPress: PropTypes.func
    };

    static defaultProps = {
        size: 1,
        width: 210,
        height: 150
    };
    _renderIcon() {
        const { size, width, height, id } = this.props
        const flag = getFlagByDollarCode(id)
        if (typeof flag === 'function') {
            const SvgComponent = flag
            return <SvgComponent width={width * size} height={height * size} />
        }
        return (
            <Image
                style={{ width: width * size, height: height * size }}
                source={flag}
            />
        )
    }
    _onPress = () => {
        this.props.onPress && this.props.onPress(this.props.id)
    }
    render() {
        return (
            <TouchableOpacity
                disabled={!this.props.onPress}
                onPress={this._onPress}
            >
                { this._renderIcon() }
            </TouchableOpacity>
        )
    }
}


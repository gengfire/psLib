/**
 * @author: Bin Wang
 * @description: 查找边缘
 *
 */
import { dorsyMath } from '../dorsyMath';

export const borderline = (imgData) => {
    // const template1 = [
    //     -2,-4,-4,-4,-2,
    //     -4,0,8,0,-4,
    //     -4,8,24,8,-4,
    //     -4,0,8,0,-4,
    //     -2,-4,-4,-4,-2
    // ];
    const template2 = [
        0,	1,	0,
		1,	-4,	1,
		0,	1,	0
    ];
    return dorsyMath.applyMatrix(imgData, template2, 250);
}

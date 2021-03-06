<?php
/**
 * This class was automatically generated by GraphQL Schema generator
 */

namespace AppBundle\GraphQL;

use Youshido\GraphQL\Schema\AbstractSchema;
use Youshido\GraphQL\Config\Schema\SchemaConfig;
use Youshido\GraphQL\Type\Object\ObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

class Schema extends AbstractSchema
{
    public function build(SchemaConfig $config)
    {
        $config->getQuery()->addFields([
            'hello' => [
                'type'    => new StringType(),
                'resolve' => function () {
                    return 'world!';
                }
            ],
            'bikerides' => [
                'type' => new ObjectType([
                    'name' => 'Bikeroute',
                    'fields' => [
                        'id' => new StringType(),
                        'title' => new StringType(),
                        'author' => new StringType(),
                        'starting_point' => new StringType(),
                        'ending_point' => new StringType(),
                        'length' => new StringType(),
                        'difficulty_level' => new StringType()
                    ]


                ]),
                'resolve' => function () {
                    return [
                        'id' => 'id ' . rand(1,1000),
                        'title' => 'title ' . rand(1,1000),
                        'author' => 'author' . rand(1,1000),
                        'starting_point' => 'starting point ' . rand(1,1000),
                        'ending_point' => 'ending point' . rand(1,1000),
                        'length' => 'length' . rand(1,1000),
                        'difficulty_level' => 'difficulty level' . rand(1,1000)
                    ];
                }
            ]


        ]);


    }

}
